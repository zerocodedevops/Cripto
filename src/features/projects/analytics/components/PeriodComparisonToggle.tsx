import { motion } from "framer-motion";
import { GitCompare } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import {
	premiumColors,
	premiumLayout,
	premiumTypography,
} from "../utils/premiumTheme";

interface PeriodComparisonToggleProps {
	readonly enabled: boolean;
	readonly onToggle: (enabled: boolean) => void;
}

export function PeriodComparisonToggle({
	enabled,
	onToggle,
}: PeriodComparisonToggleProps) {
	const { t } = useLanguage();
	return (
		<button
			type="button"
			onClick={() => onToggle(!enabled)}
			className="flex items-center gap-3 px-6 py-2 rounded-full transition-all duration-300 border border-white/5 hover:bg-white/5"
			style={{
				backgroundColor: enabled
					? `${premiumColors.brand.primary}15`
					: "rgba(255, 255, 255, 0.03)",
				color: enabled
					? premiumColors.brand.primary
					: premiumColors.accent.white,
			}}
		>
			<GitCompare
				className={`w-4 h-4 transition-colors ${enabled ? "opacity-100" : "opacity-40"}`}
			/>
			<span className="text-[10px] font-bold tracking-widest uppercase">
				{enabled ? t("comparing") : t("compare")}
			</span>

			{/* Toggle indicator */}
			<div
				className="w-8 h-4 rounded-full flex items-center px-1 transition-all"
				style={{
					backgroundColor: enabled
						? premiumColors.brand.primary
						: "rgba(255, 255, 255, 0.1)",
				}}
			>
				<motion.div
					className="w-2 h-2 rounded-full shadow-lg"
					style={{
						backgroundColor: enabled ? "#000" : premiumColors.accent.grey,
					}}
					animate={{
						x: enabled ? 16 : 0,
					}}
					transition={{ type: "spring", stiffness: 500, damping: 30 }}
				/>
			</div>
		</button>
	);
}
