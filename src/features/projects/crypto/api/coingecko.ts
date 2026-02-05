// CoinGecko API Client

import type {
	CryptoMarket,
	GlobalMarketData,
	MarketChartData,
	TrendingCoin,
} from "../types/crypto";

// Feature flag: toggle between real API (via serverless) and MSW mocks
const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === "true";

// Base URLs
const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";
const SERVERLESS_BASE_URL = "/api/crypto";

class CoinGeckoClient {
	private readonly baseUrl: string;

	constructor() {
		// Use serverless functions if real API is enabled, otherwise use CoinGecko direct (MSW intercepts)
		this.baseUrl = USE_REAL_API ? SERVERLESS_BASE_URL : COINGECKO_BASE_URL;
		console.log(
			`[CoinGecko Client] Using ${USE_REAL_API ? "real API via serverless" : "MSW mocks"}`,
		);
	}

	private async fetch<T>(endpoint: string): Promise<T> {
		// When using serverless, endpoints are already shortened (e.g., '/markets' instead of '/coins/markets')
		// When using direct CoinGecko, we need the full path
		const fullEndpoint = USE_REAL_API
			? endpoint
					.replace("/coins/markets", "/markets")
					.replace("/search/trending", "/trending")
					.replace("/coins/", "/chart/")
			: endpoint;

		const response = await fetch(`${this.baseUrl}${fullEndpoint}`);

		if (!response.ok) {
			throw new Error(`CoinGecko API Error: ${response.statusText}`);
		}

		return response.json();
	}

	// Get top coins by market cap
	async getMarkets(
		params: {
			vs_currency?: string;
			order?: string;
			per_page?: number;
			page?: number;
			sparkline?: boolean;
			price_change_percentage?: string;
		} = {},
	): Promise<CryptoMarket[]> {
		const defaults = {
			vs_currency: "eur",
			order: "market_cap_desc",
			per_page: 100,
			page: 1,
			sparkline: true,
			price_change_percentage: "7d",
		};

		const queryParams = { ...defaults, ...params };
		const query = new URLSearchParams(queryParams as any).toString();

		return this.fetch(`/coins/markets?${query}`);
	}

	// Get global market data
	async getGlobal(): Promise<GlobalMarketData> {
		return this.fetch("/global");
	}

	// Get trending coins
	async getTrending(): Promise<{ coins: TrendingCoin[] }> {
		return this.fetch("/search/trending");
	}

	// Get specific coin data
	async getCoin(
		id: string,
		params: {
			localization?: boolean;
			tickers?: boolean;
			market_data?: boolean;
			community_data?: boolean;
			developer_data?: boolean;
			sparkline?: boolean;
		} = {},
	): Promise<any> {
		const defaults = {
			localization: false,
			tickers: false,
			market_data: true,
			community_data: false,
			developer_data: false,
			sparkline: true,
		};

		const queryParams = { ...defaults, ...params };
		const query = new URLSearchParams(queryParams as any).toString();

		return this.fetch(`/coins/${id}?${query}`);
	}

	// Get historical market data
	async getMarketChart(
		id: string,
		params: {
			vs_currency?: string;
			days?: string | number;
			interval?: string;
		} = {},
	): Promise<MarketChartData> {
		const defaults = {
			vs_currency: "eur",
			days: "7",
			interval: "daily",
		};

		const queryParams = { ...defaults, ...params };
		const query = new URLSearchParams(queryParams as any).toString();

		return this.fetch(`/coins/${id}/market_chart?${query}`);
	}

	// Get simple price for multiple coins
	async getSimplePrice(
		ids: string[],
		params: {
			vs_currencies?: string;
			include_24hr_change?: boolean;
			include_market_cap?: boolean;
			include_24hr_vol?: boolean;
		} = {},
	): Promise<any> {
		const defaults = {
			vs_currencies: "eur",
			include_24hr_change: true,
			include_market_cap: true,
			include_24hr_vol: true,
		};

		const queryParams = {
			ids: ids.join(","),
			...defaults,
			...params,
		};

		const query = new URLSearchParams(queryParams as any).toString();

		return this.fetch(`/simple/price?${query}`);
	}

	// Get OHLC data (candlestick)
	async getOHLC(
		id: string,
		params: {
			vs_currency?: string;
			days?: string | number;
		} = {},
	): Promise<number[][]> {
		const defaults = {
			vs_currency: "usd",
			days: "7",
		};

		const queryParams = { ...defaults, ...params };
		const query = new URLSearchParams(queryParams as any).toString();

		return this.fetch(`/coins/${id}/ohlc?${query}`);
	}
}

export const coinGeckoClient = new CoinGeckoClient();
