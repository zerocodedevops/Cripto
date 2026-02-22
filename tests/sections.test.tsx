import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import i18n from "./setup";

// Wrapper component for tests
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
	<MemoryRouter>
		<I18nextProvider i18n={i18n}>{children}</I18nextProvider>
	</MemoryRouter>
);

describe("Portfolio Sections Render", () => {
	it("Hero section renders with main heading", () => {
		render(
			<TestWrapper>
				<Hero />
			</TestWrapper>,
		);

		// Updated heading: "Diseño Web para Pymes y Autónomos en Madrid"
		expect(screen.getByText(/Pymes y Autónomos/i)).toBeInTheDocument();
		expect(
			screen.getByText(/Disponible para nuevos proyectos/i),
		).toBeInTheDocument();
	});

	it("About section renders with correct content", () => {
		render(
			<TestWrapper>
				<About />
			</TestWrapper>,
		);

		// "Sobre" and "Mí" are in separate elements, so match partial text
		expect(screen.getByText(/Sobre/i)).toBeInTheDocument();
		expect(screen.getByText(/AI-First Development/i)).toBeInTheDocument();
	});

	it("Skills section renders with heading and content", () => {
		render(
			<TestWrapper>
				<Skills />
			</TestWrapper>,
		);

		expect(
			screen.getByRole("heading", { level: 2, name: /Habilidades/i }),
		).toBeInTheDocument();
		expect(screen.getByText("Soft Skills")).toBeInTheDocument();
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
