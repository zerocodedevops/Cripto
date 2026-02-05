import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import type { KPI } from "../types";
import {
	premiumColors,
	premiumEffects,
	premiumLayout,
	premiumTypography,
} from "../utils/premiumTheme";

interface PremiumKPICardProps {
	readonly kpi: KPI;
	readonly sparklineData?: number[];
	readonly isLoading?: boolean;
}

export function PremiumKPICard({
	kpi,
	sparklineData = [],
	isLoading,
}: PremiumKPICardProps) {
	const { t } = useLanguage();

	if (isLoading) {
		return (
			<div
				className="relative overflow-hidden p-6 animate-pulse"
				style={{
					...premiumEffects.glassmorphism,
					borderRadius: premiumLayout.borderRadius.lg,
					height: "160px",
				}}
			>
				<div className="space-y-4">
					<div className="h-4 bg-white/5 w-1/2 rounded-full"></div>
					<div className="h-10 bg-white/5 w-3/4 rounded-full"></div>
					<div className="h-2 bg-white/5 w-1/3 rounded-full"></div>
				</div>
			</div>
		);
	}

	const getTrendColor = () => {
		if (kpi.trend === "up") return premiumColors.brand.secondary; // Muted Sage
		if (kpi.trend === "down") return premiumColors.brand.tertiary; // Peach/Coral
		return premiumColors.accent.lavender;
	};

	const getTrendIcon = () => {
		if (kpi.trend === "up") return ArrowUp;
		if (kpi.trend === "down") return ArrowDown;
		return Minus;
	};

	const TrendIcon = getTrendIcon();
	const trendColor = getTrendColor();

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
			className="relative group p-6 h-full flex flex-col justify-between"
			style={{
				...premiumEffects.glassmorphism,
				borderRadius: premiumLayout.borderRadius.lg,
				transition: "transform 0.3s ease, background-color 0.3s ease",
			}}
		>
			<div className="relative z-10">
				<div className="flex justify-between items-start mb-2">
					<p
						className="text-xs font-medium tracking-wide"
						style={{
							color: premiumColors.accent.lavender,
							fontFamily: premiumTypography.fontFamily.display,
							opacity: 0.8,
						}}
					>
						{kpi.title}
					</p>

					<div
						className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold"
						style={{
							backgroundColor: `${trendColor}15`,
							color: trendColor,
						}}
					>
						<TrendIcon className="w-3 h-3" />
						<span>{Math.abs(kpi.change)}%</span>
					</div>
				</div>

				<h3
					style={{
						color: premiumColors.accent.white,
						fontFamily: premiumTypography.fontFamily.display,
					}}
				>
					<span className="text-2xl font-bold tracking-tighter">
						{kpi.value}€
					</span>
				</h3>
			</div>

			{sparklineData.length > 0 && (
				<div className="mt-4 h-12 relative w-full overflow-hidden">
					<svg
						className="w-full h-full"
						preserveAspectRatio="none"
						viewBox="0 0 100 100"
					>
						<defs>
							<linearGradient
								id={`premium-gradient-${kpi.title}`}
								x1="0%"
								y1="0%"
								x2="0%"
								y2="100%"
							>
								<stop offset="0%" stopColor={trendColor} stopOpacity="0.3" />
								<stop offset="100%" stopColor={trendColor} stopOpacity="0" />
							</linearGradient>
						</defs>
						<motion.path
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 1.5, ease: "easeInOut" }}
							d={generateSparklinePath(sparklineData)}
							fill={`url(#premium-gradient-${kpi.title})`}
							stroke={trendColor}
							strokeWidth="2.5"
							strokeLinecap="round"
							vectorEffect="non-scaling-stroke"
						/>
					</svg>
				</div>
			)}

			<div
				className="mt-3 flex items-center justify-between text-[10px]"
				style={{ color: premiumColors.accent.grey }}
			>
				<span className="font-medium uppercase tracking-widest opacity-50">
					{t("live")}
				</span>
				<span className="opacity-50">{t("vsPrev")}</span>
			</div>
		</motion.div>
	);
}

function generateSparklinePath(data: number[]): string {
	if (data.length === 0) return "";

	const max = Math.max(...data);
	const min = Math.min(...data);
	const range = max - min || 1;

	const points = data.map((value, index) => {
		const x = (index / (data.length - 1)) * 100;
		const y = 100 - ((value - min) / range) * 80 - 10; // Padding 10%
		return `${x},${y}`;
	});

	// Use curve for premium feel
	let d = `M ${points[0]}`;
	for (let i = 0; i < points.length - 1; i++) {
		const p0 = points[i].split(",").map(Number);
		const p1 = points[i + 1].split(",").map(Number);
		const midX = (p0[0] + p1[0]) / 2;
		d += ` C ${midX},${p0[1]} ${midX},${p1[1]} ${p1[0]},${p1[1]}`;
	}

	return d + ` L 100,105 L 0,105 Z`;
}
