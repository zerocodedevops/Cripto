import { type HTMLMotionProps, motion } from "framer-motion";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
	variant?: "default" | "glass" | "bordered";
	hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
	(
		{ className, variant = "default", hover = true, children, ...props },
		ref,
	) => {
		const variantStyles = {
			default: "card",
			glass: "glass rounded-2xl p-6",
			bordered: "card border-2 border-primary-500/20",
		};

		return (
			<motion.div
				ref={ref}
				className={cn(variantStyles[variant], hover && "card-hover", className)}
				whileHover={hover ? { y: -5 } : undefined}
				transition={{ duration: 0.3 }}
				{...props}
			>
				{children}
			</motion.div>
		);
	},
);

Card.displayName = "Card";

// Card subcomponents
export function CardHeader({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("mb-4", className)} {...props} />;
}

export function CardTitle({
	className,
	...props
}: HTMLAttributes<HTMLHeadingElement>) {
	return <h3 className={cn("heading-3 text-dark-100", className)} {...props} />;
}

export function CardDescription({
	className,
	...props
}: HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p className={cn("text-dark-400 text-sm mt-1", className)} {...props} />
	);
}

export function CardContent({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("", className)} {...props} />;
}

export function CardFooter({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("mt-4 pt-4 border-t border-dark-700/50", className)}
			{...props}
		/>
	);
}
