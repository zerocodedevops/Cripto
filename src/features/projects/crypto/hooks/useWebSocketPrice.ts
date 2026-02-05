import { useEffect, useRef, useState } from "react";
import { getCoinGeckoId } from "../utils/symbolMapping";
import {
	type BinanceTicker,
	getWebSocketClient,
} from "../utils/websocketClient";

export interface WebSocketPrice {
	id: string;
	symbol: string;
	name: string;
	current_price: number;
	price_change_24h: number;
	price_change_percentage_24h: number;
	market_cap: number;
	total_volume: number;
	image: string;
}

interface UseWebSocketPriceOptions {
	coingeckoIds: string[];
	enabled?: boolean;
}

export function useWebSocketPrice({
	coingeckoIds,
	enabled = true,
}: UseWebSocketPriceOptions) {
	const [prices, setPrices] = useState<Map<string, WebSocketPrice>>(new Map());
	const [isConnected, setIsConnected] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const hasConnected = useRef(false);

	useEffect(() => {
		if (!enabled || coingeckoIds.length === 0) return;

		// Prevent multiple connections
		if (hasConnected.current) {
			return;
		}

		hasConnected.current = true;

		// Get singleton WebSocket client (initialized globally)
		const client = getWebSocketClient();

		// Event Listeners
		const handleMessage = (ticker: BinanceTicker) => {
			const coingeckoId = getCoinGeckoId(ticker.symbol);
			if (!coingeckoId) return;

			setPrices((prev) => {
				const updated = new Map(prev);
				const currentPrice = Number.parseFloat(ticker.lastPrice);
				const priceChangePercent = Number.parseFloat(ticker.priceChangePercent);
				const priceChange = Number.parseFloat(ticker.priceChange);
				const volume = Number.parseFloat(ticker.quoteVolume);

				updated.set(coingeckoId, {
					id: coingeckoId,
					symbol: ticker.symbol.replace("USDT", "").toLowerCase(),
					name: coingeckoId.charAt(0).toUpperCase() + coingeckoId.slice(1),
					current_price: currentPrice,
					price_change_24h: priceChange,
					price_change_percentage_24h: priceChangePercent,
					market_cap: currentPrice * volume, // Approximate
					total_volume: volume,
					image: `https://coin-images.coingecko.com/coins/images/1/large/${coingeckoId}.png`,
				});

				return updated;
			});
		};

		const handleConnect = () => {
			setIsConnected(true);
			setError(null);
		};

		const handleDisconnect = () => {
			// Double check state before setting offline
			if (client.isConnected()) return;
			setIsConnected(false);
		};

		const handleError = () => {
			// Don't set offline if we are actually connected
			if (client.isConnected()) {
				return;
			}
			setError("WebSocket connection error");
			setIsConnected(false);
		};

		// Register listeners
		client.addMessageListener(handleMessage);
		client.addConnectListener(handleConnect);
		client.addDisconnectListener(handleDisconnect);
		client.addErrorListener(handleError);

		// Initial state check
		if (client.isConnected()) {
			setIsConnected(true);
		} else {
			client.connect();
		}

		// Cleanup: Remove listeners only
		return () => {
			client.removeMessageListener(handleMessage);
			client.removeConnectListener(handleConnect);
			client.removeDisconnectListener(handleDisconnect);
			client.removeErrorListener(handleError);
		};
	}, [coingeckoIds, enabled]);

	// Convert Map to array for compatibility with existing code
	const data = Array.from(prices.values());

	return {
		data,
		isConnected,
		isLoading: !isConnected && data.length === 0,
		error,
	};
}
