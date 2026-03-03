import "@testing-library/jest-dom";
import React from "react";
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

// Mock framer-motion — strip motion-specific props to avoid React DOM warnings
const MOTION_PROPS = new Set([
	"initial", "animate", "exit", "transition", "variants", "layout", "layoutId",
	"whileHover", "whileTap", "whileFocus", "whileDrag", "whileInView",
	"drag", "dragConstraints", "dragElastic", "dragMomentum", "dragTransition",
	"dragSnapToOrigin", "dragPropagation", "onDrag", "onDragStart", "onDragEnd",
	"onAnimationStart", "onAnimationComplete", "onLayoutAnimationStart", "onLayoutAnimationComplete",
	"viewport", "custom",
]);

function stripMotionProps(props: Record<string, unknown>) {
	const cleaned: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(props)) {
		if (!MOTION_PROPS.has(key)) {
			cleaned[key] = value;
		}
	}
	return cleaned;
}

function createMotionComponent(tag: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return ({ children, ...props }: any) => {
		const cleanProps = stripMotionProps(props);
		return React.createElement(tag, cleanProps, children);
	};
}

vi.mock("framer-motion", () => ({
	motion: new Proxy({}, {
		get: (_target, prop: string) => createMotionComponent(prop),
	}),
	useAnimation: () => ({ start: vi.fn(), set: vi.fn() }),
	useInView: () => true,
	useScroll: () => ({ scrollY: { on: vi.fn() } }),
	AnimatePresence: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));
