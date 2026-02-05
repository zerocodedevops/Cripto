import { getBinanceSymbol } from "./symbolMapping";

export interface BinanceTicker {
	symbol: string;
	priceChange: string;
	priceChangePercent: string;
	lastPrice: string;
	volume: string;
	quoteVolume: string;
}

interface TickerUpdate {
	e: string; // Event type
	E: number; // Event time
	s: string; // Symbol
	p: string; // Price change
	P: string; // Price change percent
	w: string; // Weighted average price
	x: string; // First trade(F)-1 price
	c: string; // Last price
	Q: string; // Last quantity
	b: string; // Best bid price
	B: string; // Best bid quantity
	a: string; // Best ask price
	A: string; // Best ask quantity
	o: string; // Open price
	h: string; // High price
	l: string; // Low price
	v: string; // Total traded base asset volume
	q: string; // Total traded quote asset volume
	O: number; // Statistics open time
	C: number; // Statistics close time
	F: number; // First trade ID
	L: number; // Last trade ID
	n: number; // Total number of trades
}

// Event Emitter types
type MessageCallback = (data: BinanceTicker) => void;
type VoidCallback = () => void;
type ErrorCallback = (error: Event) => void;

export class BinanceWebSocketClient {
	private ws: WebSocket | null = null;
	private readonly symbols: string[] = [];
	private reconnectAttempts = 0;
	private readonly maxReconnectAttempts = 5;
	private readonly reconnectDelay = 3000;
	private isConnecting = false;

	// Listeners (Array to support multiple components)
	private messageListeners: MessageCallback[] = [];
	private connectListeners: VoidCallback[] = [];
	private disconnectListeners: VoidCallback[] = [];
	private errorListeners: ErrorCallback[] = [];

	constructor(coingeckoIds: string[]) {
		// Convert CoinGecko IDs to Binance symbols
		this.symbols = coingeckoIds
			.map((id) => getBinanceSymbol(id))
			.filter((symbol): symbol is string => symbol !== undefined);
	}

	// Listener management
	addMessageListener(cb: MessageCallback) {
		this.messageListeners.push(cb);
	}
	removeMessageListener(cb: MessageCallback) {
		this.messageListeners = this.messageListeners.filter((l) => l !== cb);
	}

	addConnectListener(cb: VoidCallback) {
		this.connectListeners.push(cb);
	}
	removeConnectListener(cb: VoidCallback) {
		this.connectListeners = this.connectListeners.filter((l) => l !== cb);
	}

	addDisconnectListener(cb: VoidCallback) {
		this.disconnectListeners.push(cb);
	}
	removeDisconnectListener(cb: VoidCallback) {
		this.disconnectListeners = this.disconnectListeners.filter((l) => l !== cb);
	}

	addErrorListener(cb: ErrorCallback) {
		this.errorListeners.push(cb);
	}
	removeErrorListener(cb: ErrorCallback) {
		this.errorListeners = this.errorListeners.filter((l) => l !== cb);
	}

	connect() {
		if (this.isConnecting || this.ws?.readyState === WebSocket.OPEN) {
			if (this.ws?.readyState === WebSocket.OPEN) {
				// If already connected, notify the new listener immediately
				this.connectListeners.forEach((l) => l());
			}
			return;
		}

		this.isConnecting = true;

		// Connect to streams for all symbols
		// Format: btcusdt@ticker/ethusdt@ticker
		const streams = this.symbols.map((s) => `${s}@ticker`).join("/");
		// Use port 443 (standard SSL) to avoid firewall blocking on 9443
		const url = `wss://stream.binance.com:443/stream?streams=${streams}`;

		console.log("🔌 Connecting to Binance WebSocket...");
		console.log("📡 URL:", url);

		try {
			this.ws = new WebSocket(url);

			this.ws.onopen = () => {
				console.log("✅ Binance WebSocket connected");
				this.isConnecting = false;
				this.reconnectAttempts = 0;
				this.connectListeners.forEach((l) => l());
			};

			this.ws.onmessage = (event) => {
				try {
					const message = JSON.parse(event.data);

					// Binance multi-stream format: { stream: "...", data: { ... } }
					if (message.stream && message.data) {
						const ticker: TickerUpdate = message.data;

						const formattedTicker: BinanceTicker = {
							symbol: ticker.s,
							priceChange: ticker.p,
							priceChangePercent: ticker.P,
							lastPrice: ticker.c,
							volume: ticker.v,
							quoteVolume: ticker.q,
						};

						this.messageListeners.forEach((l) => l(formattedTicker));
					}
				} catch (error) {
					console.debug("Failed to parse WebSocket message", error);
				}
			};

			this.ws.onerror = (error) => {
				this.isConnecting = false;
				this.errorListeners.forEach((l) => l(error));
			};

			this.ws.onclose = () => {
				console.log("🔌 WebSocket disconnected");
				this.isConnecting = false;
				this.disconnectListeners.forEach((l) => l());
				this.attemptReconnect();
			};
		} catch (error) {
			console.error("💥 Failed to create WebSocket:", error);
			this.isConnecting = false;
		}
	}

	private attemptReconnect() {
		if (this.reconnectAttempts >= this.maxReconnectAttempts) {
			console.error("⚠️ Max reconnect attempts reached");
			return;
		}

		this.reconnectAttempts++;
		const delay = this.reconnectDelay * this.reconnectAttempts;
		console.log(`🔄 Reconnecting inside ${delay}ms...`);

		setTimeout(() => {
			this.connect();
		}, delay);
	}

	disconnect() {
		if (this.ws) {
			this.ws.close();
			this.ws = null;
		}
	}

	isConnected(): boolean {
		return this.ws?.readyState === WebSocket.OPEN;
	}
}

// Singleton: Initialize with full list of coins needed for the app
const ALL_APP_COINS = [
	"bitcoin",
	"ethereum",
	"cardano",
	"solana",
	"polkadot",
	"dogecoin",
	"avalanche",
	"chainlink",
	"polygon",
	"litecoin",
];
let globalWSClient: BinanceWebSocketClient | null = null;

// Modified signature: default arguments for backwards compatibility
export function getWebSocketClient(): BinanceWebSocketClient {
	if (!globalWSClient) {
		console.log("🆕 Initializing Global WebSocket Client");
		// Always initialize with ALL coins the app might need
		globalWSClient = new BinanceWebSocketClient(ALL_APP_COINS);
	}
	return globalWSClient;
}
