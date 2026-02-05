import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "accent" | "success" | "warning";

interface BadgeProps extends ComponentProps<typeof motion.span> {
	readonly variant?: BadgeVariant;
	readonly icon?: React.ReactNode;
	readonly children?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
	default: "badge",
	primary: "badge-primary",
	accent: "badge-accent",
	success: "bg-green-500/10 text-green-400 border-green-500/30",
	warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
};

export function Badge({
	className,
	variant = "default",
	icon,
	children,
	...props
}: BadgeProps) {
	return (
		<motion.span
			className={cn("badge", variantStyles[variant], className)}
			whileHover={{ scale: 1.05 }}
			transition={{ duration: 0.2 }}
			{...props}
		>
			{icon}
			{children}
		</motion.span>
	);
}

// Tech badges with predefined styles
const techColors: Record<string, { bg: string; text: string; border: string }> =
	{
		react: {
			bg: "bg-cyan-500/10",
			text: "text-cyan-400",
			border: "border-cyan-500/30",
		},
		typescript: {
			bg: "bg-blue-500/10",
			text: "text-blue-400",
			border: "border-blue-500/30",
		},
		javascript: {
			bg: "bg-yellow-500/10",
			text: "text-yellow-400",
			border: "border-yellow-500/30",
		},
		node: {
			bg: "bg-green-500/10",
			text: "text-green-400",
			border: "border-green-500/30",
		},
		python: {
			bg: "bg-blue-600/10",
			text: "text-blue-300",
			border: "border-blue-600/30",
		},
		tailwind: {
			bg: "bg-teal-500/10",
			text: "text-teal-400",
			border: "border-teal-500/30",
		},
		vite: {
			bg: "bg-purple-500/10",
			text: "text-purple-400",
			border: "border-purple-500/30",
		},
		firebase: {
			bg: "bg-orange-500/10",
			text: "text-orange-400",
			border: "border-orange-500/30",
		},
		supabase: {
			bg: "bg-emerald-500/10",
			text: "text-emerald-400",
			border: "border-emerald-500/30",
		},
		nextjs: {
			bg: "bg-gray-500/10",
			text: "text-gray-300",
			border: "border-gray-500/30",
		},
		mongodb: {
			bg: "bg-green-600/10",
			text: "text-green-300",
			border: "border-green-600/30",
		},
		postgresql: {
			bg: "bg-blue-700/10",
			text: "text-blue-300",
			border: "border-blue-700/30",
		},
		docker: {
			bg: "bg-sky-500/10",
			text: "text-sky-400",
			border: "border-sky-500/30",
		},
		aws: {
			bg: "bg-orange-600/10",
			text: "text-orange-300",
			border: "border-orange-600/30",
		},
		ai: {
			bg: "bg-fuchsia-500/10",
			text: "text-fuchsia-400",
			border: "border-fuchsia-500/30",
		},
	};

interface TechBadgeProps extends ComponentProps<typeof motion.span> {
	readonly tech: string;
	readonly icon?: React.ReactNode;
}

export function TechBadge({ tech, icon, className, ...props }: TechBadgeProps) {
	const techKey = tech.toLowerCase().replaceAll(/[.\s]/g, "");
	const colors = techColors[techKey] || {
		bg: "bg-dark-700/50",
		text: "text-dark-200",
		border: "border-dark-600/50",
	};

	return (
		<motion.span
			className={cn(
				"inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
				colors.bg,
				colors.text,
				colors.border,
				"transition-all duration-300",
				className,
			)}
			whileHover={{ scale: 1.05 }}
			transition={{ duration: 0.2 }}
			{...props}
		>
			{icon}
			{tech}
		</motion.span>
	);
}
