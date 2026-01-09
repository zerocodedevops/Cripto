import { useQuery } from '@tanstack/react-query';
import { coinGeckoClient } from '../api/coingecko';
import type { GlobalMarketData } from '../types/crypto';

export function useMarketData() {
  return useQuery<GlobalMarketData>({
    queryKey: ['marketData'],
    queryFn: () => coinGeckoClient.getGlobal(),
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Data considered fresh for 30s
  });
}
