import { motion } from "framer-motion";
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import { useLanguage } from "../i18n/LanguageContext";
import type { RevenueData } from "../types";
import { technicalColors, technicalTypography } from "../utils/technicalTheme";

interface TechnicalConversionPieChartProps {
	readonly data: RevenueData[];
	readonly isLoading: boolean;
	readonly onSliceClick?: (label: string, value: number) => void;
}

const TECH_COLORS = [
	technicalColors.electric.blue,
	technicalColors.electric.green,
	technicalColors.electric.amber,
];

const CustomTooltip = ({ active, payload }: any) => {
	if (!active || !payload?.length) return null;

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className="bg-[#1a1f35] border p-3"
			style={{
				borderColor: technicalColors.electric.blue,
				boxShadow: `0 0 20px ${technicalColors.electric.blue}40`,
				fontFamily: technicalTypography.fontFamily.mono,
			}}
		>
			<p className="text-xs font-bold text-white mb-1">{payload[0].name}</p>
			<p
				className="text-[10px]"
				style={{ color: technicalColors.electric.cyan }}
			>
				{payload[0].value}% TOTAL
			</p>
		</motion.div>
	);
};

interface CustomLabelProps {
	readonly cx?: number;
	readonly cy?: number;
	readonly midAngle?: number;
	readonly innerRadius?: number;
	readonly outerRadius?: number;
	readonly percent?: number;
}

const CustomLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
}: CustomLabelProps) => {
	if (
		!cx ||
		!cy ||
		midAngle === undefined ||
		!innerRadius ||
		!outerRadius ||
		percent === undefined
	)
		return null;

	const RADIAN = Math.PI / 180;
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
			className="text-xs font-black"
			style={{ fontFamily: technicalTypography.fontFamily.display }}
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

const LegendFormatter = (value: string) => (
	<span
		className="text-[10px] tracking-wider uppercase"
		style={{
			color: technicalColors.electric.cyan,
			fontFamily: technicalTypography.fontFamily.mono,
		}}
	>
		{value}
	</span>
);

export function TechnicalConversionPieChart({
	data,
	isLoading,
	onSliceClick,
}: TechnicalConversionPieChartProps) {
	const { t } = useLanguage();
	if (isLoading) {
		return (
			<div className="h-80 bg-[#1a1f35] border border-[#1e3a5f] animate-pulse" />
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.05 }}
			className="relative group"
		>
			{/* Main card */}
			<div
				className="relative overflow-hidden bg-[#1a1f35] border p-4"
				style={{
					borderColor: technicalColors.grid.primary,
					boxShadow: `inset 0 0 0 1px ${technicalColors.electric.green}20`,
				}}
			>
				{/* Header */}
				<div className="flex items-center gap-3 mb-4">
					<div
						className="w-1 h-4"
						style={{ backgroundColor: technicalColors.electric.green }}
					></div>
					<h3
						className="text-sm font-bold tracking-wider uppercase"
						style={{
							color: "#ffffff",
							fontFamily: technicalTypography.fontFamily.display,
						}}
					>
						{t("deviceDistribution")}
					</h3>
				</div>

				{/* Chart */}
				<div className="h-[300px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={data}
								cx="50%"
								cy="45%"
								innerRadius={60}
								outerRadius={95}
								paddingAngle={2}
								dataKey="value"
								label={CustomLabel}
								animationBegin={0}
								animationDuration={800}
								animationEasing="ease-out"
								onClick={(e: any) => {
									if (e?.name && e?.value && onSliceClick) {
										onSliceClick(e.name, e.value);
									}
								}}
								style={{ cursor: onSliceClick ? "pointer" : "default" }}
							>
								{data.map((entry, index) => (
									<Cell
										key={`cell-tech-${entry.device}-${index}`}
										fill={TECH_COLORS[index % TECH_COLORS.length]}
										stroke="#0a0e1a"
										strokeWidth={2}
									/>
								))}
							</Pie>

							<Tooltip content={<CustomTooltip />} />

							<Legend
								verticalAlign="bottom"
								height={36}
								iconType="square"
								formatter={LegendFormatter}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>

				{/* Grid overlay */}
				<div
					className="absolute inset-0 pointer-events-none opacity-5"
					style={{
						backgroundImage: `
              linear-gradient(${technicalColors.grid.secondary} 1px, transparent 1px),
              linear-gradient(90deg, ${technicalColors.grid.secondary} 1px, transparent 1px)
            `,
						backgroundSize: "20px 20px",
					}}
				></div>

				{/* Corner indicators */}
				<div
					className="absolute top-0 left-0 w-3 h-3 border-l border-t"
					style={{ borderColor: technicalColors.electric.green }}
				></div>
				<div
					className="absolute top-0 right-0 w-3 h-3 border-r border-t"
					style={{ borderColor: technicalColors.electric.green }}
				></div>
				<div
					className="absolute bottom-0 left-0 w-3 h-3 border-l border-b"
					style={{ borderColor: technicalColors.electric.green }}
				></div>
				<div
					className="absolute bottom-0 right-0 w-3 h-3 border-r border-b"
					style={{ borderColor: technicalColors.electric.green }}
				></div>
			</div>
		</motion.div>
	);
}
