import { HttpResponse, http } from "msw";
import type { DashboardData } from "../features/projects/analytics/types";

export const handlers = [
	http.get("/api/analytics/dashboard", ({ request }) => {
		const url = new URL(request.url);
		const range = url.searchParams.get("range") || "7d";
		const segment = url.searchParams.get("segment") || "all";
		console.log(
			`Generating mock data for range: ${range}, segment: ${segment}`,
		);

		let multiplier = 1;
		if (range === "30d") multiplier = 4;
		else if (range === "90d") multiplier = 12;

		// Helper to scale and format strings like "12,345"
		const scale = (
			valStr: string | number,
			mul: number,
			isPercent = false,
		): string => {
			if (typeof valStr === "number") return (valStr * mul).toLocaleString();
			const num = Number.parseFloat(
				valStr.replaceAll(",", "").replaceAll("%", ""),
			);
			if (Number.isNaN(num)) return valStr;
			if (isPercent) return num.toFixed(1) + "%"; // Don't scale percentages usually, or maybe just slight variation? Let's not scale % for now.
			return (num * mul).toLocaleString();
		};

		// Helper for segment logic
		const getSegmentValue = (mobile: number, desktop: number, all: number) => {
			if (segment === "mobile") return mobile;
			if (segment === "desktop") return desktop;
			return all;
		};

		const mockData: DashboardData = {
			kpi: {
				totalSales: {
					title: "Ventas Totales",
					value: scale(getSegmentValue(4520, 7930, 12450), multiplier),
					change: getSegmentValue(12.5, 18.2, 15.2),
					trend: "up",
				},
				totalRevenue: {
					title: "Ingresos",
					value: scale(getSegmentValue(15200, 28000, 43200), multiplier),
					change: getSegmentValue(5.2, 11.5, 8.5),
					trend: "up",
				},
				conversionRate: {
					title: "Conversión",
					value: getSegmentValue(4.2, 3.1, 3.6) + "%",
					change: getSegmentValue(2.1, -0.8, -1.2),
					trend: segment === "mobile" ? "up" : "down",
				},
				activeUsers: {
					title: "Usuarios Activos",
					value: scale(getSegmentValue(850, 353, 1203), multiplier),
					change: 5.4,
					trend: "up",
				},
			},
			salesTrend: (() => {
				let trendLength = 7;
				if (range === "90d") trendLength = 30;
				else if (range === "30d") trendLength = 15;
				return Array.from({ length: trendLength }, (_, i) => {
					const date = new Date();
					date.setDate(date.getDate() - i);
					// Randomize slightly based on multiplier to make it look realistic
					let salesDivisor = 1;
					if (range === "90d") salesDivisor = 5;
					else if (range === "30d") salesDivisor = 2;

					let revenueDivisor = 1;
					if (range === "90d") revenueDivisor = 5;
					else if (range === "30d") revenueDivisor = 2;

					const baseSales =
						(getSegmentValue(1000, 2000, 3000) * multiplier) / salesDivisor;
					const baseRevenue =
						(getSegmentValue(2500, 5000, 7500) * multiplier) / revenueDivisor;

					return {
						date: date.toISOString().split("T")[0],
						sales: Math.floor(baseSales * (0.8 + Math.random() * 0.4)),
						revenue: Math.floor(baseRevenue * (0.8 + Math.random() * 0.4)),
						previousSales: Math.floor(baseSales * 0.7),
						previousRevenue: Math.floor(baseRevenue * 0.7),
					};
				}).reverse();
			})(),
			revenueByDevice: (() => {
				let desktopValue = 45;
				if (segment === "desktop") desktopValue = 100;
				else if (segment === "mobile") desktopValue = 0;

				let mobileValue = 35;
				if (segment === "mobile") mobileValue = 100;
				else if (segment === "desktop") mobileValue = 0;

				return [
					{ device: "Desktop", value: desktopValue, color: "#0ea5e9" },
					{ device: "Mobile", value: mobileValue, color: "#8b5cf6" },
					{
						device: "Tablet",
						value: segment === "all" ? 20 : 0,
						color: "#10b981",
					},
				];
			})(),
			conversionFunnel: [
				{
					name: "Visitas",
					count: Math.floor(getSegmentValue(5000, 7000, 12000) * multiplier),
					dropOff: 0,
				},
				{
					name: "Carrito",
					count: Math.floor(getSegmentValue(2000, 2500, 4500) * multiplier),
					dropOff: 60,
				},
				{
					name: "Checkout",
					count: Math.floor(getSegmentValue(800, 1000, 1800) * multiplier),
					dropOff: 60,
				},
				{
					name: "Compra",
					count: Math.floor(getSegmentValue(400, 550, 950) * multiplier),
					dropOff: 50,
				},
			],
		};

		return HttpResponse.json(mockData);
	}),

	// Crypto API Mocks with DYNAMIC pricing (simulates live updates)
	http.get("https://api.coingecko.com/api/v3/coins/markets", ({ request }) => {
		const url = new URL(request.url);
		const perPage = Number.parseInt(
			url.searchParams.get("per_page") || "10",
			10,
		);

		// Helper to add realistic price variation (-0.5% to +0.5% per refresh)
		const varyPrice = (basePrice: number) => {
			const variation = (Math.random() - 0.5) * 0.01; // -0.5% to +0.5%
			return basePrice * (1 + variation);
		};

		// Base prices (these will vary slightly each request)
		const basePrices = [94520, 3342, 1, 658, 191, 1, 0.95, 0.35, 0.24, 35];

		// Extended crypto list for realistic mock data
		const cryptoList = [
			{ id: "bitcoin", symbol: "btc", name: "Bitcoin" },
			{ id: "ethereum", symbol: "eth", name: "Ethereum" },
			{ id: "tether", symbol: "usdt", name: "Tether" },
			{ id: "binancecoin", symbol: "bnb", name: "BNB" },
			{ id: "solana", symbol: "sol", name: "Solana" },
			{ id: "usd-coin", symbol: "usdc", name: "USDC" },
			{ id: "cardano", symbol: "ada", name: "Cardano" },
			{ id: "dogecoin", symbol: "doge", name: "Dogecoin" },
			{ id: "tron", symbol: "trx", name: "TRON" },
			{ id: "avalanche", symbol: "avax", name: "Avalanche" },
			{ id: "chainlink", symbol: "link", name: "Chainlink" },
			{ id: "wrapped-bitcoin", symbol: "wbtc", name: "Wrapped Bitcoin" },
			{ id: "polkadot", symbol: "dot", name: "Polkadot" },
			{ id: "polygon", symbol: "matic", name: "Polygon" },
			{ id: "litecoin", symbol: "ltc", name: "Litecoin" },
			{ id: "near", symbol: "near", name: "NEAR Protocol" },
			{ id: "uniswap", symbol: "uni", name: "Uniswap" },
			{ id: "internet-computer", symbol: "icp", name: "Internet Computer" },
			{ id: "ethereum-classic", symbol: "etc", name: "Ethereum Classic" },
			{ id: "aptos", symbol: "apt", name: "Aptos" },
			{ id: "stellar", symbol: "xlm", name: "Stellar" },
			{ id: "cosmos", symbol: "atom", name: "Cosmos" },
			{ id: "monero", symbol: "xmr", name: "Monero" },
			{ id: "okb", symbol: "okb", name: "OKB" },
			{ id: "filecoin", symbol: "fil", name: "Filecoin" },
			{ id: "hedera", symbol: "hbar", name: "Hedera" },
			{ id: "optimism", symbol: "op", name: "Optimism" },
			{ id: "arbitrum", symbol: "arb", name: "Arbitrum" },
			{ id: "vechain", symbol: "vet", name: "VeChain" },
			{ id: "aave", symbol: "aave", name: "Aave" },
			{ id: "algorand", symbol: "algo", name: "Algorand" },
			{ id: "injective", symbol: "inj", name: "Injective" },
			{ id: "maker", symbol: "mkr", name: "Maker" },
			{ id: "the-graph", symbol: "grt", name: "The Graph" },
			{ id: "render-token", symbol: "rndr", name: "Render" },
			{ id: "quant", symbol: "qnt", name: "Quant" },
			{ id: "thorchain", symbol: "rune", name: "THORChain" },
			{ id: "fantom", symbol: "ftm", name: "Fantom" },
			{ id: "the-sandbox", symbol: "sand", name: "The Sandbox" },
			{ id: "axie-infinity", symbol: "axs", name: "Axie Infinity" },
			{ id: "elrond", symbol: "egld", name: "MultiversX" },
			{ id: "eos", symbol: "eos", name: "EOS" },
			{ id: "theta", symbol: "theta", name: "Theta Network" },
			{ id: "decentraland", symbol: "mana", name: "Decentraland" },
			{ id: "flow", symbol: "flow", name: "Flow" },
			{ id: "tezos", symbol: "xtz", name: "Tezos" },
			{ id: "chiliz", symbol: "chz", name: "Chiliz" },
			{ id: "neo", symbol: "neo", name: "NEO" },
			{ id: "zcash", symbol: "zec", name: "Zcash" },
			{ id: "gala", symbol: "gala", name: "Gala" },
		];

		const mockCryptoData = Array.from(
			{ length: Math.min(perPage, 50) },
			(_, i) => {
				const crypto = cryptoList[i] || {
					id: `coin-${i}`,
					symbol: `coin${i}`,
					name: `Coin ${i}`,
				};
				const basePrice = basePrices[i] || (50 - i) * 10;
				const current_price = varyPrice(basePrice);
				const change24h = Math.random() * 20 - 10; // Random between -10% and +10%

				return {
					id: crypto.id,
					symbol: crypto.symbol,
					name: crypto.name,
					image: `https://coin-images.coingecko.com/coins/images/${i + 1}/large/coin.png`,
					current_price,
					market_cap:
						[
							1850000000000, 402000000000, 140000000000, 95000000000,
							89000000000, 43000000000, 33000000000, 50000000000, 20000000000,
							13000000000,
						][i] || 1000000000 * (100 - i),
					market_cap_rank: i + 1,
					fully_diluted_valuation: null,
					total_volume:
						[
							45000000000, 22000000000, 95000000000, 1800000000, 4200000000,
							7500000000, 750000000, 2800000000, 1200000000, 485000000,
						][i] || 1000000,
					high_24h: current_price * 1.02,
					low_24h: current_price * 0.98,
					price_change_24h: current_price * (change24h / 100),
					price_change_percentage_24h: change24h,
					market_cap_change_24h: 0,
					market_cap_change_percentage_24h: change24h,
					circulating_supply: 19500000,
					total_supply: 21000000,
					max_supply: 21000000,
					ath: 105000,
					ath_change_percentage: -10,
					ath_date: "2024-12-05T00:00:00.000Z",
					atl: 67.81,
					atl_change_percentage: 139393.44,
					atl_date: "2013-07-06T00:00:00.000Z",
					last_updated: new Date().toISOString(),
					sparkline_in_7d: {
						price: Array.from(
							{ length: 168 },
							(_, j) => basePrice + (Math.random() - 0.5) * (basePrice * 0.05),
						),
					},
					price_change_percentage_7d_in_currency:
						2.34 + (Math.random() - 0.5) * 3,
				};
			},
		);

		return HttpResponse.json(mockCryptoData);
	}),

	http.get("https://api.coingecko.com/api/v3/global", () => {
		return HttpResponse.json({
			data: {
				active_cryptocurrencies: 15127,
				markets: 1184,
				total_market_cap: {
					usd: 3220000000000 + (Math.random() - 0.5) * 100000000000,
				},
				total_volume: {
					usd: 134140000000 + (Math.random() - 0.5) * 10000000000,
				},
				market_cap_percentage: {
					btc: 56.73 + (Math.random() - 0.5) * 0.5,
					eth: 11.83 + (Math.random() - 0.5) * 0.3,
				},
				market_cap_change_percentage_24h_usd: -0.59 + (Math.random() - 0.5) * 2,
				updated_at: Math.floor(Date.now() / 1000),
			},
		});
	}),

	http.get("https://api.coingecko.com/api/v3/search/trending", () => {
		const trendingCoins = [
			{ id: "bitcoin", name: "Bitcoin", symbol: "BTC", market_cap_rank: 1 },
			{ id: "ethereum", name: "Ethereum", symbol: "ETH", market_cap_rank: 2 },
			{ id: "solana", name: "Solana", symbol: "SOL", market_cap_rank: 5 },
			{ id: "cardano", name: "Cardano", symbol: "ADA", market_cap_rank: 8 },
			{
				id: "avalanche",
				name: "Avalanche",
				symbol: "AVAX",
				market_cap_rank: 12,
			},
			{ id: "polkadot", name: "Polkadot", symbol: "DOT", market_cap_rank: 15 },
			{ id: "polygon", name: "Polygon", symbol: "MATIC", market_cap_rank: 18 },
		];

		return HttpResponse.json({
			coins: trendingCoins.map((coin, i) => ({
				item: {
					id: coin.id,
					coin_id: i + 1,
					name: coin.name,
					symbol: coin.symbol,
					market_cap_rank: coin.market_cap_rank,
					thumb: `https://coin-images.coingecko.com/coins/images/${i + 1}/thumb/coin.png`,
					small: `https://coin-images.coingecko.com/coins/images/${i + 1}/small/coin.png`,
					large: `https://coin-images.coingecko.com/coins/images/${i + 1}/large/coin.png`,
					slug: coin.id,
					price_btc: 0.001 * (10 - i),
					score: i,
				},
			})),
		});
	}),

	http.get(
		"https://api.coingecko.com/api/v3/coins/:id/market_chart",
		({ request }) => {
			const url = new URL(request.url);
			const daysParam = url.searchParams.get("days") || "7";
			const days = Number.parseInt(daysParam, 10);
			const now = Date.now();
			const hourMs = 60 * 60 * 1000;

			// Generate REALISTIC crypto price movements
			const basePrice = 94520;
			const dataPoints = days * 24; // Hourly data

			// Generate realistic price history with trends and volatility
			const prices = [];
			let currentPrice = basePrice;

			// Create a trending movement (bullish or bearish over the period)
			const overallTrend = (Math.random() - 0.5) * 0.15; // -7.5% to +7.5% overall trend
			const trendPerHour = overallTrend / dataPoints;

			for (let i = 0; i < dataPoints; i++) {
				const hourAgo = now - (dataPoints - i) * hourMs;

				// Apply trend
				currentPrice *= 1 + trendPerHour;

				// Add realistic volatility (0.2% to 2% per hour)
				const volatility = (Math.random() - 0.5) * 0.02;
				currentPrice *= 1 + volatility;

				// Occasional dramatic movements (5% chance of 3-5% spike/drop)
				if (Math.random() < 0.05) {
					const dramaticMove = (Math.random() - 0.5) * 0.08; // ±4%
					currentPrice *= 1 + dramaticMove;
				}

				// Keep price within reasonable bounds (±20% of base)
				if (currentPrice > basePrice * 1.2) currentPrice = basePrice * 1.18;
				if (currentPrice < basePrice * 0.8) currentPrice = basePrice * 0.82;

				prices.push([hourAgo, currentPrice]);
			}

			return HttpResponse.json({
				prices,
				market_caps: prices.map(([time, price]) => [time, price * 19500000]),
				total_volumes: prices.map(([time, price]) => [
					time,
					price * 450000 * (0.8 + Math.random() * 0.4),
				]),
			});
		},
	),

	// Catch-all for any other CoinGecko requests to prevent "Failed to fetch" errors
	http.get("https://api.coingecko.com/api/v3/*", ({ request }) => {
		console.warn(
			"⚠️ [MSW] Unhandled CoinGecko request caught by wildcard:",
			request.url,
		);
		return HttpResponse.json({});
	}),
];
