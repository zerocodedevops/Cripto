import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import type { ConversionStep } from "../types";

interface RevenueBarChartProps {
	readonly data: ConversionStep[];
	readonly isLoading: boolean;
}

export function RevenueBarChart({ data, isLoading }: RevenueBarChartProps) {
	if (isLoading) {
		return <div className="h-80 bg-slate-800/50 rounded-xl animate-pulse" />;
	}

	return (
		<Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm p-6">
			<h3 className="text-white text-lg font-medium mb-6">
				Embudo de Conversión
			</h3>
			<div className="h-[300px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={data} layout="vertical">
						<CartesianGrid
							strokeDasharray="3 3"
							stroke="#334155"
							horizontal={false}
						/>
						<XAxis
							type="number"
							stroke="#94a3b8"
							fontSize={12}
							tickLine={false}
							axisLine={false}
						/>
						<YAxis
							dataKey="name"
							type="category"
							stroke="#94a3b8"
							fontSize={12}
							tickLine={false}
							axisLine={false}
							width={100}
						/>
						<Tooltip
							cursor={{ fill: "#334155", opacity: 0.2 }}
							contentStyle={{
								backgroundColor: "#1e293b",
								borderColor: "#334155",
							}}
							itemStyle={{ color: "#e2e8f0" }}
						/>
						<Bar
							dataKey="count"
							fill="#10b981"
							radius={[0, 4, 4, 0]}
							barSize={30}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</Card>
	);
}
