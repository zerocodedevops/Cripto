import type { KPI } from "../types";
import { PremiumKPICard } from "./PremiumKPICard";

interface PremiumKPIStatsProps {
	readonly kpis: { [key: string]: KPI };
	readonly isLoading: boolean;
}

// Mock sparkline data generator for premium feel
const generateSparklineData = (trend: "up" | "down" | "neutral"): number[] => {
	const baseValue = 50;
	const data: number[] = [];

	for (let i = 0; i < 15; i++) {
		const randomVariation = Math.random() * 8 - 4;
		let trendValue = 0;
		if (trend === "up") trendValue = Math.sin(i / 2) * 10 + i * 2;
		else if (trend === "down") trendValue = Math.cos(i / 2) * 10 - i * 2;
		data.push(Math.max(0, baseValue + trendValue + randomVariation));
	}

	return data;
};

export function PremiumKPIStats({ kpis, isLoading }: PremiumKPIStatsProps) {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				{[1, 2, 3, 4].map((id) => (
					<PremiumKPICard
						key={`loading-${id}`}
						kpi={{} as KPI}
						isLoading={true}
					/>
				))}
			</div>
		);
	}

	// Define specific order for bento-like feel if needed, otherwise default grid
	const kpiEntries = Object.entries(kpis);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			{kpiEntries.map(([key, kpi]) => (
				<PremiumKPICard
					key={key}
					kpi={kpi}
					sparklineData={generateSparklineData(kpi.trend)}
				/>
			))}
		</div>
	);
}
