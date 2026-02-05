import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { describe, expect, it } from "vitest";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import i18n from "./setup";

// Wrapper component for tests
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
	<I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe("Portfolio Sections Render", () => {
	it("Hero section renders with main heading", () => {
		render(
			<TestWrapper>
				<Hero />
			</TestWrapper>,
		);

		expect(screen.getByText(/Hola, soy/i)).toBeInTheDocument();
		expect(screen.getByText(/ZeroCode_DevOps/i)).toBeInTheDocument();
		expect(screen.getByText(/Desarrollador Autodidacta/i)).toBeInTheDocument();
		expect(screen.getByText(/Contáctame/i)).toBeInTheDocument();
		expect(screen.getByText(/Ver GitHub/i)).toBeInTheDocument();
	});

	it("About section renders with correct content", () => {
		render(
			<TestWrapper>
				<About />
			</TestWrapper>,
		);

		expect(screen.getByText(/Sobre mí/i)).toBeInTheDocument();
		expect(screen.getByText(/AI-First Developer/i)).toBeInTheDocument();
	});

	it("Skills section renders with all categories", () => {
		render(
			<TestWrapper>
				<Skills />
			</TestWrapper>,
		);

		expect(
			screen.getByRole("heading", { level: 2, name: /Skills/i }),
		).toBeInTheDocument();
		expect(screen.getByText("Frontend")).toBeInTheDocument();
		expect(screen.getByText("Backend & BaaS")).toBeInTheDocument();
		expect(screen.getByText("Testing & QA")).toBeInTheDocument();
		expect(screen.getByText("DevOps & Mobile")).toBeInTheDocument();
	});

	it("Projects section renders with project cards", () => {
		render(
			<TestWrapper>
				<Projects />
			</TestWrapper>,
		);

		expect(screen.getByText(/DevOps Shop/i)).toBeInTheDocument();
		expect(screen.getByText(/AI Chat Assistant/i)).toBeInTheDocument();
	});

	it("Contact section renders with form fields", () => {
		render(
			<TestWrapper>
				<Contact />
			</TestWrapper>,
		);

		expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Asunto/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Enviar mensaje/i }),
		).toBeInTheDocument();
	});
});
