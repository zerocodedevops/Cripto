import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { handlers } from "@/mocks/handlers";
import DashboardPage from "../pages/DashboardPage";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

import { MemoryRouter } from "react-router-dom";

// Mock language context - returns the key itself as text
vi.mock("../i18n/LanguageContext", () => ({
	useLanguage: () => ({ t: (key: string) => key }),
	LanguageProvider: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>
			<MemoryRouter>{children}</MemoryRouter>
		</QueryClientProvider>
	);
};

describe("DashboardPage", () => {
	it("shows loading skeletons initially", () => {
		render(<DashboardPage />, { wrapper: createWrapper() });
		const skeletons = document.getElementsByClassName("animate-pulse");
		expect(skeletons.length).toBeGreaterThan(0);
	});

	it("renders login screen by default", () => {
		render(<DashboardPage />, { wrapper: createWrapper() });

		// Dashboard shows a login gate first ("Welcome Back")
		expect(screen.getByText("Welcome Back")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
	});

	it("renders page structure", () => {
		render(<DashboardPage />, { wrapper: createWrapper() });

		// The page renders with the Overview tab visible behind the login
		const overviewElements = screen.getAllByText("Overview");
		expect(overviewElements.length).toBeGreaterThan(0);
	});

	it("handles api error gracefully", async () => {
		server.use(
			http.get("/api/analytics/dashboard", () => {
				return new HttpResponse(null, { status: 500 });
			}),
		);

		render(<DashboardPage />, { wrapper: createWrapper() });

		// The mock returns the translation key itself
		await waitFor(() => {
			expect(screen.getByText("systemError")).toBeInTheDocument();
		});
	});
});
