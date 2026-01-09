import { useQuery } from '@tanstack/react-query';
import { DashboardData, DateRange, Segment } from '../types';

interface UseDashboardMetricsProps {
  range: DateRange;
  segment: Segment;
}

const fetchDashboardData = async (range: DateRange, segment: Segment): Promise<DashboardData> => {
  const params = new URLSearchParams({ range, segment });
  const response = await fetch(`/api/analytics/dashboard?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard metrics');
  }
  
  return response.json();
};

export function useDashboardMetrics({ range, segment }: UseDashboardMetricsProps) {
  return useQuery({
    queryKey: ['dashboard', range, segment],
    queryFn: () => fetchDashboardData(range, segment),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
