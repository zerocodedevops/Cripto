import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Contact } from "@/components/sections/Contact";
import i18n from "./setup";

// Wrapper component for tests
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
	<I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe("Accessibility Tests", () => {
	describe("Navbar", () => {
		it("has accessible navigation links", () => {
			render(
				<TestWrapper>
					<Navbar />
				</TestWrapper>,
			);

			// Check for aria-labels on social links
			expect(screen.getByLabelText(/GitHub/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/LinkedIn/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
		});

		it("has accessible mobile menu button", () => {
			render(
				<TestWrapper>
					<Navbar />
				</TestWrapper>,
			);

			expect(screen.getByLabelText(/Abrir menú/i)).toBeInTheDocument();
		});
	});

	describe("Footer", () => {
		it("has accessible scroll to top button", () => {
			render(
				<TestWrapper>
					<Footer />
				</TestWrapper>,
			);

			expect(screen.getByLabelText(/Volver arriba/i)).toBeInTheDocument();
		});

		it("has accessible social links", () => {
			render(
				<TestWrapper>
					<Footer />
				</TestWrapper>,
			);

			const socialLinks = screen.getAllByLabelText(/GitHub|LinkedIn|Email/i);
			expect(socialLinks.length).toBeGreaterThan(0);
		});
	});

	describe("Contact Form", () => {
		it("has properly labeled form inputs", () => {
			render(
				<TestWrapper>
					<Contact />
				</TestWrapper>,
			);

			// All inputs should have associated labels
			expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/Asunto/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
		});

		it("form inputs have proper id attributes", () => {
			render(
				<TestWrapper>
					<Contact />
				</TestWrapper>,
			);

			expect(screen.getByLabelText(/Nombre/i)).toHaveAttribute("id", "name");
			expect(screen.getByLabelText(/Email/i)).toHaveAttribute("id", "email");
			expect(screen.getByLabelText(/Asunto/i)).toHaveAttribute("id", "subject");
			expect(screen.getByLabelText(/Mensaje/i)).toHaveAttribute(
				"id",
				"message",
			);
		});

		it("submit button is accessible", () => {
			render(
				<TestWrapper>
					<Contact />
				</TestWrapper>,
			);

			const submitButton = screen.getByRole("button", {
				name: /Enviar mensaje/i,
			});
			expect(submitButton).toBeInTheDocument();
			expect(submitButton).toHaveAttribute("type", "submit");
		});
	});
});
