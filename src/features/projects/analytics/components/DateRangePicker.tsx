import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import {
	premiumColors,
	premiumEffects,
	premiumLayout,
	premiumTypography,
} from "../utils/premiumTheme";

interface DateRangePickerProps {
	readonly onRangeSelect: (start: Date, end: Date) => void;
	readonly currentRange: { start: Date; end: Date };
}

const QUICK_RANGES = [
	{ label: "7D", days: 7 },
	{ label: "30D", days: 30 },
	{ label: "90D", days: 90 },
];

export function DateRangePicker({
	onRangeSelect,
	currentRange,
}: DateRangePickerProps) {
	const { t } = useLanguage();
	const [isOpen, setIsOpen] = useState(false);

	const handleQuickRange = (days: number) => {
		const end = new Date();
		const start = new Date();
		start.setDate(start.getDate() - days);
		onRangeSelect(start, end);
		setIsOpen(false);
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
	};

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-3 py-2 text-xs font-semibold hover:opacity-80 transition-opacity"
				style={{
					color: premiumColors.accent.white,
					fontFamily: premiumTypography.fontFamily.display,
				}}
			>
				<Calendar
					className="w-4 h-4 opacity-100"
					style={{ color: premiumColors.brand.primary }}
				/>
				<span className="tracking-wide">
					{formatDate(currentRange.start)} - {formatDate(currentRange.end)}
				</span>
				<ChevronDown
					className={`w-3 h-3 transition-transform duration-300 opacity-40 ${isOpen ? "rotate-180" : ""}`}
				/>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 10, scale: 0.95 }}
						transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
						className="absolute top-full left-0 mt-4 z-50 p-2 min-w-[200px]"
						style={{
							...premiumEffects.glassmorphism,
							backgroundColor: "rgba(18, 18, 18, 0.9)",
							borderRadius: premiumLayout.borderRadius.md,
							boxShadow: premiumEffects.shadow.lg,
						}}
					>
						<div className="p-2">
							<p className="text-[10px] font-bold tracking-widest mb-3 uppercase opacity-40">
								{t("quickSelect")}
							</p>
							<div className="grid grid-cols-1 gap-1">
								{QUICK_RANGES.map((range) => (
									<button
										key={range.label}
										type="button"
										onClick={() => handleQuickRange(range.days)}
										className="w-full text-left px-4 py-2 text-xs font-medium rounded-xl hover:bg-white/5 transition-colors"
									>
										Last {range.label}
									</button>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
