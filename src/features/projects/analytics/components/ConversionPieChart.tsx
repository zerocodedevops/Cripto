import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { RevenueData } from '../types';
import { Card } from '@/components/ui/Card';

interface ConversionPieChartProps {
  readonly data: RevenueData[];
  readonly isLoading: boolean;
}

export function ConversionPieChart({ data, isLoading }: ConversionPieChartProps) {
  if (isLoading) {
    return <div className="h-80 bg-slate-800/50 rounded-xl animate-pulse" />;
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm p-6">
      <h3 className="text-white text-lg font-medium mb-6">Ingresos por Dispositivo</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.device}-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
