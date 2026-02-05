import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import type { SalesData } from "../types";

interface SalesLineChartProps {
	readonly data: SalesData[];
	readonly isLoading: boolean;
}

export function SalesLineChart({ data, isLoading }: SalesLineChartProps) {
	if (isLoading) {
		return <div className="h-80 bg-slate-800/50 rounded-xl animate-pulse" />;
	}

	return (
		<Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm p-6">
			<h3 className="text-white text-lg font-medium mb-6">
				Tendencia de Ventas
			</h3>
			<div className="h-[300px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data}>
						<CartesianGrid
							strokeDasharray="3 3"
							stroke="#334155"
							vertical={false}
						/>
						<XAxis
							dataKey="date"
							stroke="#94a3b8"
							fontSize={12}
							tickLine={false}
							axisLine={false}
						/>
						<YAxis
							stroke="#94a3b8"
							fontSize={12}
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => `$${value}`}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "#1e293b",
								borderColor: "#334155",
							}}
							itemStyle={{ color: "#e2e8f0" }}
						/>
						<Line
							type="monotone"
							dataKey="sales"
							stroke="#0ea5e9"
							strokeWidth={3}
							dot={{ fill: "#0ea5e9", strokeWidth: 2 }}
							activeDot={{ r: 8 }}
						/>
						<Line
							type="monotone"
							dataKey="revenue"
							stroke="#8b5cf6"
							strokeWidth={3}
							dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</Card>
	);
}
