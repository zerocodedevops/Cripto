import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Runs a cleanup after each test case
afterEach(() => {
	cleanup();
});

// Mock matchMedia
Object.defineProperty(globalThis, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

// Mock ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

// Mock IntersectionObserver
const IntersectionObserverMock = vi.fn(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

// Mock scrollTo
globalThis.scrollTo = vi.fn(() => { });
Element.prototype.scrollIntoView = vi.fn();

// Mock framer-motion
vi.mock("framer-motion", () => ({
	motion: {
		div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
			<div {...props}>{children}</div>
		),
		h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
			<h1 {...props}>{children}</h1>
		),
		h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
			<h2 {...props}>{children}</h2>
		),
		h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
			<h3 {...props}>{children}</h3>
		),
		p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
			<p {...props}>{children}</p>
		),
		ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
			<ul {...props}>{children}</ul>
		),
		li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
			<li {...props}>{children}</li>
		),
		section: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
			<section {...props}>{children}</section>
		),
		header: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
			<header {...props}>{children}</header>
		),
		footer: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
			<footer {...props}>{children}</footer>
		),
		button: ({
			children,
			...props
		}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
			<button {...props}>{children}</button>
		),
		a: ({
			children,
			...props
		}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
			<a {...props}>{children}</a>
		),
		span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
			<span {...props}>{children}</span>
		),
		img: ({ ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
			<img alt="" {...props} />
		),
		form: ({
			children,
			...props
		}: React.FormHTMLAttributes<HTMLFormElement>) => (
			<form {...props}>{children}</form>
		),
		label: ({
			children,
			...props
		}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
			<label {...props}>{children}</label>
		),
		input: ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
			<input {...props} />
		),
		textarea: ({
			children,
			...props
		}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
			<textarea {...props}>{children}</textarea>
		),
		path: ({ children, ...props }: React.SVGAttributes<SVGPathElement>) => (
			<path {...props}>{children}</path>
		),
	},
	useAnimation: () => ({ start: vi.fn(), set: vi.fn() }),
	useInView: () => true,
	useScroll: () => ({ scrollY: { on: vi.fn() } }),
	AnimatePresence: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));
