// Type definitions for Crypto Dashboard

export interface CryptoMarket {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number;
	market_cap: number;
	market_cap_rank: number;
	fully_diluted_valuation: number | null;
	total_volume: number;
	high_24h: number;
	low_24h: number;
	price_change_24h: number;
	price_change_percentage_24h: number;
	market_cap_change_24h: number;
	market_cap_change_percentage_24h: number;
	circulating_supply: number;
	total_supply: number | null;
	max_supply: number | null;
	ath: number;
	ath_change_percentage: number;
	ath_date: string;
	atl: number;
	atl_change_percentage: number;
	atl_date: string;
	last_updated: string;
	sparkline_in_7d?: {
		price: number[];
	};
	price_change_percentage_7d_in_currency?: number;
}

export interface GlobalMarketData {
	data: {
		active_cryptocurrencies: number;
		markets: number;
		total_market_cap: {
			[key: string]: number;
		};
		total_volume: {
			[key: string]: number;
		};
		market_cap_percentage: {
			btc: number;
			eth: number;
		};
		market_cap_change_percentage_24h_usd: number;
		updated_at: number;
	};
}

export interface TrendingCoin {
	item: {
		id: string;
		coin_id: number;
		name: string;
		symbol: string;
		market_cap_rank: number;
		thumb: string;
		small: string;
		large: string;
		slug: string;
		price_btc: number;
		score: number;
	};
}

export interface MarketChartData {
	prices: [number, number][];
	market_caps: [number, number][];
	total_volumes: [number, number][];
}

export interface PortfolioHolding {
	id: string;
	coinId: string;
	symbol: string;
	name: string;
	amount: number;
	avgBuyPrice: number;
	image: string;
}

export interface PortfolioStats {
	totalValue: number;
	totalCost: number;
	totalProfitLoss: number;
	totalProfitLossPercentage: number;
	dayChange: number;
	dayChangePercentage: number;
}

export interface PriceAlert {
	id: string;
	coinId: string;
	symbol: string;
	targetPrice: number;
	condition: "above" | "below";
	active: boolean;
	triggered: boolean;
	createdAt: string;
}

export interface NewsItem {
	id: string;
	title: string;
	url: string;
	source: string;
	published_at: string;
	domain: string;
	votes: {
		positive: number;
		negative: number;
		important: number;
	};
	currencies: Array<{
		code: string;
		title: string;
	}>;
}

export type TimeRange = "1h" | "24h" | "7d" | "30d" | "90d" | "1y" | "all";
export type Currency = "usd" | "eur" | "btc" | "eth";
