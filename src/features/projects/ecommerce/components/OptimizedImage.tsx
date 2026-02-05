import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface OptimizedImageProps {
	readonly src: string;
	readonly alt: string;
	readonly className?: string;
	readonly width?: number | string;
	readonly height?: number | string;
}

export default function OptimizedImage({
	src,
	alt,
	className = "",
	width,
	height,
}: OptimizedImageProps) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		const img = new Image();
		img.src = src;
		img.onload = () => setIsLoaded(true);
		img.onerror = () => setHasError(true);
	}, [src]);

	return (
		<div
			className={`relative overflow-hidden ${className}`}
			style={{ width, height }}
		>
			{/* 1. Placeholder with Blur */}
			<div
				className={`absolute inset-0 bg-slate-200 dark:bg-slate-800 transition-opacity duration-700 ${isLoaded ? "opacity-0" : "opacity-100"}`}
				aria-hidden="true"
			/>

			{/* 2. Loading Pulse (Optional, only visible if loading takes time) */}
			<AnimatePresence>
				{!isLoaded && (
					<motion.div
						initial={{ opacity: 0.5 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							repeat: Infinity,
							duration: 1,
							repeatType: "reverse",
						}}
						className="absolute inset-0 bg-slate-300/50 dark:bg-slate-700/50 backdrop-blur-md"
					/>
				)}
			</AnimatePresence>

			{/* 3. Actual Image */}
			{hasError ? (
				<div className="flex items-center justify-center w-full h-full bg-slate-100 dark:bg-slate-800 text-slate-400">
					<span className="text-xs">Sin imagen</span>
				</div>
			) : (
				<img
					src={src}
					alt={alt}
					className={`
            w-full h-full object-contain transition-all duration-700 ease-out
            ${isLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-xl scale-110"}
          `}
				/>
			)}
		</div>
	);
}
