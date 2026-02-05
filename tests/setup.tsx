import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import React from "react";
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
globalThis.scrollTo = vi.fn(() => {});
Element.prototype.scrollIntoView = vi.fn();

// Mock framer-motion
vi.mock("framer-motion", () => ({
	motion: {
		div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
		h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
		h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
		h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
		p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
		ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
		li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
		section: ({ children, ...props }: any) => (
			<section {...props}>{children}</section>
		),
		header: ({ children, ...props }: any) => (
			<header {...props}>{children}</header>
		),
		footer: ({ children, ...props }: any) => (
			<footer {...props}>{children}</footer>
		),
		button: ({ children, ...props }: any) => (
			<button {...props}>{children}</button>
		),
		a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
		span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
		img: ({ ...props }: any) => <img alt="" {...props} />,
		form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
		label: ({ children, ...props }: any) => (
			<label {...props}>{children}</label>
		),
		input: ({ children, ...props }: any) => (
			<input {...props}>{children} </input>
		),
		textarea: ({ children, ...props }: any) => (
			<textarea {...props}>{children}</textarea>
		),
		path: ({ children, ...props }: any) => <path {...props}>{children}</path>,
	},
	useAnimation: () => ({ start: vi.fn(), set: vi.fn() }),
	useInView: () => true,
	useScroll: () => ({ scrollY: { on: vi.fn() } }),
	AnimatePresence: ({ children }: any) => <>{children}</>,
}));
