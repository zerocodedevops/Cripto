import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useWatchlist } from "../context/WatchlistContext";
import { useCryptoPrice } from "../hooks/useCryptoPrice";
import { useCurrencyFormat } from "../hooks/useCurrencyFormat";
import { cryptoTheme } from "../utils/cryptoTheme";
import { formatPercentage } from "../utils/formatters";
import { CoinIcon } from "./CoinIcon";

export function TopGainers() {
	const { t } = useTranslation();
	const { formatCurrency } = useCurrencyFormat();
	const { data, isLoading } = useCryptoPrice({
		order: "market_cap_desc",
		per_page: 100,
		sparkline: false,
	});

	const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

	if (isLoading || !data) {
		return (
			<div
				className="h-64 rounded-2xl animate-pulse"
				style={cryptoTheme.effects.glass}
			/>
		);
	}

	const topGainers = data
		.filter((coin) => coin.price_change_percentage_24h > 0)
		.sort(
			(a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h,
		)
		.slice(0, 5);

	return (
		<div
			className="p-6 rounded-2xl border backdrop-blur-xl min-h-[400px]"
			style={{
				...cryptoTheme.effects.glass,
				borderColor: cryptoTheme.colors.border.primary,
			}}
		>
			<div className="flex items-center gap-3 mb-6">
				<div
					className="w-10 h-10 rounded-xl flex items-center justify-center"
					style={{ background: `${cryptoTheme.colors.status.bullish}20` }}
				>
					<TrendingUp
						className="w-5 h-5"
						style={{ color: cryptoTheme.colors.status.bullish }}
					/>
				</div>
				<h3
					className="text-lg font-bold"
					style={{ color: cryptoTheme.colors.text.primary }}
				>
					{t("crypto.sections.topGainers")}
				</h3>
			</div>

			<div className="space-y-4">
				{topGainers.map((coin, index) => {
					const isFav = isInWatchlist(coin.id);
					return (
						<motion.div
							key={coin.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.05 }}
							className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
						>
							<div className="flex items-center gap-3">
								<button
									onClick={(e) => {
										e.stopPropagation();
										isFav
											? removeFromWatchlist(coin.id)
											: addToWatchlist(coin.id);
									}}
									className="hover:scale-110 transition-transform p-1 -ml-1"
								>
									<Star
										className="w-4 h-4"
										style={{
											color: isFav
												? "#fbbf24"
												: cryptoTheme.colors.text.tertiary,
											fill: isFav ? "#fbbf24" : "none",
										}}
									/>
								</button>
								<CoinIcon symbol={coin.symbol} size="w-8 h-8" />
								<div>
									<p
										className="font-medium text-sm"
										style={{ color: cryptoTheme.colors.text.primary }}
									>
										{coin.symbol.toUpperCase()}
									</p>
									<p
										className="text-xs"
										style={{ color: cryptoTheme.colors.text.tertiary }}
									>
										{coin.name}
									</p>
								</div>
							</div>
							<div className="text-right">
								<p
									className="font-bold text-sm"
									style={{ color: cryptoTheme.colors.text.primary }}
								>
									{formatCurrency(coin.current_price)}
								</p>
								<p
									className="text-sm font-medium"
									style={{ color: cryptoTheme.colors.status.bullish }}
								>
									{formatPercentage(coin.price_change_percentage_24h)}
								</p>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
