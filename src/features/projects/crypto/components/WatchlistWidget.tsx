import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useWatchlist } from "../context/WatchlistContext";
import { useCryptoPrice } from "../hooks/useCryptoPrice";
import { useCurrencyFormat } from "../hooks/useCurrencyFormat";
import { cryptoTheme } from "../utils/cryptoTheme";
import { formatPercentage } from "../utils/formatters";

export function WatchlistWidget() {
	const { watchlist } = useWatchlist();
	const { formatCurrency } = useCurrencyFormat();

	// Fetch data for ALL coins to filter locally (effficient for small watchlists)
	// In a real app with huge lists, we would fetch specific IDs
	const { data: allCoins } = useCryptoPrice({ per_page: 100 });

	const watchlistCoins =
		allCoins?.filter((c) => watchlist.includes(c.id)) || [];

	if (watchlist.length === 0) {
		return (
			<div
				className="p-6 rounded-2xl border backdrop-blur-xl flex flex-col items-center justify-center text-center h-full"
				style={{
					...cryptoTheme.effects.glass,
					borderColor: cryptoTheme.colors.border.primary,
				}}
			>
				<Star
					className="w-12 h-12 mb-4"
					style={{ color: "#fbbf24", fill: "#fbbf24" }}
				/>
				<h3
					className="text-xl font-bold mb-2"
					style={{ color: cryptoTheme.colors.text.primary }}
				>
					Tu Watchlist
				</h3>
				<p
					className="text-sm px-4"
					style={{ color: cryptoTheme.colors.text.tertiary }}
				>
					Añade criptos favoritas usando la estrella ⭐ en las listas para
					seguirlas aquí.
				</p>
			</div>
		);
	}

	return (
		<div
			className="p-6 rounded-2xl border backdrop-blur-xl h-full"
			style={{
				...cryptoTheme.effects.glass,
				borderColor: cryptoTheme.colors.border.primary,
			}}
		>
			<div className="flex items-center justify-between mb-4">
				<h3
					className="text-lg font-bold flex items-center gap-2"
					style={{ color: cryptoTheme.colors.text.primary }}
				>
					<Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
					Watchlist
				</h3>
				<span
					className="text-xs font-bold px-2 py-1 rounded-full bg-white/5"
					style={{ color: cryptoTheme.colors.text.secondary }}
				>
					{watchlist.length}
				</span>
			</div>

			<div className="space-y-3">
				{watchlistCoins.map((coin) => (
					<motion.div
						key={coin.id}
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
					>
						<div className="flex items-center gap-3">
							<img
								src={coin.image}
								alt={coin.name}
								className="w-8 h-8 rounded-full"
							/>
							<div>
								<div
									className="font-bold text-sm"
									style={{ color: cryptoTheme.colors.text.primary }}
								>
									{coin.symbol.toUpperCase()}
								</div>
								<div
									className="text-xs"
									style={{ color: cryptoTheme.colors.text.tertiary }}
								>
									{coin.name}
								</div>
							</div>
						</div>

						<div className="text-right">
							<div
								className="font-bold text-sm"
								style={{ color: cryptoTheme.colors.text.primary }}
							>
								{formatCurrency(coin.current_price)}
							</div>
							<div
								className="text-xs font-bold"
								style={{
									color:
										coin.price_change_percentage_24h >= 0
											? cryptoTheme.colors.status.bullish
											: cryptoTheme.colors.status.bearish,
								}}
							>
								{formatPercentage(coin.price_change_percentage_24h)}
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}
