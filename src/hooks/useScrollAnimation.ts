import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface UseScrollAnimationOptions {
	threshold?: number;
	once?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}): {
	ref: React.RefObject<HTMLDivElement>;
	controls: ReturnType<typeof useAnimation>;
	isInView: boolean;
} {
	const { threshold = 0.1, once = true } = options;
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { amount: threshold, once });
	const controls = useAnimation();

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		} else if (!once) {
			controls.start("hidden");
		}
	}, [isInView, controls, once]);

	return { ref, controls, isInView };
}

// Animation variants for common patterns
export const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
	},
};

export const fadeIn = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
	},
};

export const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
};

export const scaleIn = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
	},
};

export const slideInLeft = {
	hidden: { opacity: 0, x: -50 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
	},
};

export const slideInRight = {
	hidden: { opacity: 0, x: 50 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
	},
};
