import { useQuery } from "@tanstack/react-query";
import { coinGeckoClient } from "../api/coingecko";
import type { MarketChartData } from "../types/crypto";

export function useMarketChart(coinId: string, days: string | number = 7) {
	return useQuery<MarketChartData>({
		queryKey: ["marketChart", coinId, days],
		queryFn: () => coinGeckoClient.getMarketChart(coinId, { days }),
		enabled: !!coinId,
		refetchInterval: 60000, // Refetch every minute
		staleTime: 30000,
	});
}
