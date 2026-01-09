import { useQuery } from '@tanstack/react-query';
import { coinGeckoClient } from '../api/coingecko';
import type { TrendingCoin } from '../types/crypto';

export function useTrendingCoins() {
  return useQuery<{ coins: TrendingCoin[] }>({
    queryKey: ['trendingCoins'],
    queryFn: () => coinGeckoClient.getTrending(),
    refetchInterval: 120000, // Refetch every 2 minutes
    staleTime: 60000, // Data considered fresh for 1 minute
  });
}
