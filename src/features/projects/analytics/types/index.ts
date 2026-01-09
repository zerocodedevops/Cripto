export interface KPI {
  title: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon?: string;
}

export interface SalesData {
  date: string;
  sales: number;
  revenue: number;
  previousSales?: number;
  previousRevenue?: number;
}

export interface RevenueData {
  device: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

export interface ConversionStep {
  name: string;
  count: number;
  dropOff: number;
}

export interface DashboardData {
  kpi: {
    totalSales: KPI;
    totalRevenue: KPI;
    conversionRate: KPI;
    activeUsers: KPI;
  };
  salesTrend: SalesData[];
  revenueByDevice: RevenueData[];
  conversionFunnel: ConversionStep[];
}

export type DateRange = '7d' | '30d' | '90d';
export type Segment = 'all' | 'mobile' | 'desktop';
