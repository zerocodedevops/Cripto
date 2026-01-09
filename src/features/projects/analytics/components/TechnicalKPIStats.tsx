import { KPI } from '../types';
import { TechnicalKPICard } from './TechnicalKPICard';

interface TechnicalKPIStatsProps {
  readonly kpis: { [key: string]: KPI };
  readonly isLoading: boolean;
}

// Mock sparkline data generator
const generateSparklineData = (trend: 'up' | 'down' | 'neutral'): number[] => {
  const baseValue = 50;
  const data: number[] = [];
  
  for (let i = 0; i < 12; i++) {
    const randomVariation = Math.random() * 10 - 5;
    let trendValue = 0;
    if (trend === 'up') {
      trendValue = i * 2;
    } else if (trend === 'down') {
      trendValue = -i * 2;
    }
    data.push(Math.max(0, baseValue + trendValue + randomVariation));
  }
  
  return data;
};

export function TechnicalKPIStats({ kpis, isLoading }: TechnicalKPIStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((id) => (
          <TechnicalKPICard key={`loading-${id}`} kpi={{} as KPI} isLoading={true} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {Object.entries(kpis).map(([key, kpi]) => (
        <TechnicalKPICard 
          key={key} 
          kpi={kpi} 
          sparklineData={generateSparklineData(kpi.trend)}
        />
      ))}
    </div>
  );
}
