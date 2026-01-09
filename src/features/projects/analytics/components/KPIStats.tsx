import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { KPI } from '../types';
import { Card } from '@/components/ui/Card';

interface KPIStatsProps {
  readonly kpis: { [key: string]: KPI };
  readonly isLoading: boolean;
}

export function KPIStats({ kpis, isLoading }: KPIStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((id) => (
          <div key={`kpi-skeleton-${id}`} className="h-32 bg-slate-800/50 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {Object.entries(kpis).map(([key, kpi]) => (
        <Card key={key} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 text-sm font-medium">{kpi.title}</h3>
            {getTrendBadge(kpi)}
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{kpi.value}</div>
        </Card>
      ))}
    </div>
  );
}

function getTrendBadge(kpi: KPI) {
  let colorClass = 'bg-slate-500/10 text-slate-400';
  let Icon = Minus;

  if (kpi.trend === 'up') {
    colorClass = 'bg-green-500/10 text-green-400';
    Icon = ArrowUp;
  } else if (kpi.trend === 'down') {
    colorClass = 'bg-red-500/10 text-red-400';
    Icon = ArrowDown;
  }

  return (
    <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${colorClass}`}>
      <Icon className="w-3 h-3 mr-1" />
      {Math.abs(kpi.change)}%
    </span>
  );
}
