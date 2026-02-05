import { useEffect, useState } from "react";
import { analytics } from "../services/analytics";
import type { CryptoMarket as Coin } from "../types/crypto";

const CACHE_TTL = 60 * 1000; // 1 minute
const cache = new Map<string, { data: Coin[]; timestamp: number }>();

// Allow any options to be passed to avoid breaking changes with existing components
export function useCryptoPrice(options: any = { per_page: 20 }) {
	const [data, setData] = useState<Coin[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPrices = async () => {
			try {
				setIsLoading(true);
				const cacheKey = `coins_${options.per_page}`;
				const cached = cache.get(cacheKey);

				if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
					setData(cached.data);
					setIsLoading(false);
					return;
				}

				// Check if MSW is active (mock mode)
				// In real app we might fallback to real API if desired, but we stick to stability
				const response = await fetch(
					`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=${options.per_page}&page=1&sparkline=false`,
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const json = await response.json();

				// Update Cache
				cache.set(cacheKey, { data: json, timestamp: Date.now() });

				setData(json);
				analytics.trackEvent("fetch_prices_success");
			} catch (err) {
				console.error("Failed to fetch prices", err);
				setError("Failed to load prices");
				analytics.trackEvent("fetch_prices_error", { error: err });
			} finally {
				setIsLoading(false);
			}
		};

		fetchPrices();
		const interval = setInterval(fetchPrices, 30000); // Poll every 30s
		return () => clearInterval(interval);
	}, [options.per_page]);

	return { data, isLoading, error };
}
