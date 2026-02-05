import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download, FileSpreadsheet, FileText } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import {
	premiumColors,
	premiumEffects,
	premiumLayout,
	premiumTypography,
} from "../utils/premiumTheme";

interface ExportMenuProps {
	readonly onExportCSV: () => void;
	readonly onExportPDF: () => void;
}

export function ExportMenu({ onExportCSV, onExportPDF }: ExportMenuProps) {
	const { t } = useLanguage();
	const [isOpen, setIsOpen] = useState(false);

	const handleExport = (type: "csv" | "pdf") => {
		if (type === "csv") onExportCSV();
		else onExportPDF();
		setIsOpen(false);
	};

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 border border-white/5 hover:bg-white/5"
				style={{
					backgroundColor: "rgba(255, 255, 255, 0.03)",
					color: premiumColors.accent.white,
				}}
			>
				<Download className="w-4 h-4 opacity-60" />
				<span className="text-[10px] font-bold tracking-widest uppercase">
					{t("export")}
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
						className="absolute top-full right-0 mt-3 z-[100] min-w-[180px] p-2"
						style={{
							...premiumEffects.glassmorphism,
							backgroundColor: "rgba(18, 18, 18, 0.9)",
							borderRadius: premiumLayout.borderRadius.md,
							boxShadow: premiumEffects.shadow.lg,
						}}
					>
						<div className="space-y-1">
							<button
								type="button"
								onClick={() => handleExport("csv")}
								className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium rounded-xl hover:bg-white/5 transition-colors"
							>
								<FileSpreadsheet className="w-4 h-4 opacity-60" />
								<span>{t("exportCSV")}</span>
							</button>

							<button
								type="button"
								onClick={() => handleExport("pdf")}
								className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium rounded-xl hover:bg-white/5 transition-colors"
							>
								<FileText className="w-4 h-4 opacity-60" />
								<span>{t("exportPDF")}</span>
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
