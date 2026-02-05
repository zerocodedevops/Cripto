// Symbol mapping between CoinGecko IDs and Binance trading pairs
export const COINGECKO_TO_BINANCE: Record<string, string> = {
	bitcoin: "btcusdt",
	ethereum: "ethusdt",
	tether: "usdtusdt",
	binancecoin: "bnbusdt",
	solana: "solusdt",
	"usd-coin": "usdcusdt",
	cardano: "adausdt",
	dogecoin: "dogeusdt",
	tron: "trxusdt",
	avalanche: "avaxusdt",
	chainlink: "linkusdt",
	"wrapped-bitcoin": "btcusdt",
	polkadot: "dotusdt",
	polygon: "maticusdt",
	litecoin: "ltcusdt",
	near: "nearusdt",
	uniswap: "uniusdt",
	"internet-computer": "icpusdt",
	"ethereum-classic": "etcusdt",
	aptos: "aptusdt",
	stellar: "xlmusdt",
	cosmos: "atomusdt",
	monero: "xmrusdt",
	okb: "okbusdt",
	filecoin: "filusdt",
	hedera: "hbarusdt",
	optimism: "opusdt",
	arbitrum: "arbusdt",
	vechain: "vetusdt",
	aave: "aaveusdt",
	algorand: "algousdt",
	injective: "injusdt",
	maker: "mkrusdt",
	"the-graph": "grtusdt",
	"render-token": "rndrusdt",
	quant: "qntusdt",
	thorchain: "runeusdt",
	fantom: "ftmusdt",
	"the-sandbox": "sandusdt",
	"axie-infinity": "axsusdt",
	elrond: "egldusdt",
	eos: "eosusdt",
	theta: "thetausdt",
	decentraland: "manausdt",
	flow: "flowusdt",
	tezos: "xtzusdt",
	chiliz: "chzusdt",
	neo: "neousdt",
	zcash: "zecusdt",
	gala: "galausdt",
};

export const BINANCE_TO_COINGECKO: Record<string, string> = Object.entries(
	COINGECKO_TO_BINANCE,
).reduce(
	(acc, [coingecko, binance]) => {
		acc[binance] = coingecko;
		return acc;
	},
	{} as Record<string, string>,
);

export function getCoinGeckoId(binanceSymbol: string): string | undefined {
	return BINANCE_TO_COINGECKO[binanceSymbol.toLowerCase()];
}

export function getBinanceSymbol(coingeckoId: string): string | undefined {
	return COINGECKO_TO_BINANCE[coingeckoId.toLowerCase()];
}
