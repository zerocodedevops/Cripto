import { motion } from "framer-motion";
import { Flame, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useWatchlist } from "../context/WatchlistContext";
import { useTrendingCoins } from "../hooks/useTrendingCoins";
import { cryptoTheme } from "../utils/cryptoTheme";
import { CoinIcon } from "./CoinIcon";

export function TrendingCoins() {
	const { t } = useTranslation();
	const { data, isLoading } = useTrendingCoins();

	const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

	if (isLoading || !data) {
		return (
			<div
				className="h-64 rounded-2xl animate-pulse"
				style={cryptoTheme.effects.glass}
			/>
		);
	}

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
					style={{ background: `${cryptoTheme.colors.chart.quaternary}20` }}
				>
					<Flame
						className="w-5 h-5"
						style={{ color: cryptoTheme.colors.chart.quaternary }}
					/>
				</div>
				<h3
					className="text-lg font-bold"
					style={{ color: cryptoTheme.colors.text.primary }}
				>
					{t("crypto.sections.trending")}
				</h3>
			</div>

			<div className="space-y-3">
				{data.coins.slice(0, 7).map((trending, index) => {
					const coin = trending.item;
					const isFav = isInWatchlist(coin.id);
					return (
						<motion.div
							key={coin.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
						>
							<div
								className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
								style={{
									background: cryptoTheme.colors.bg.tertiary,
									color: cryptoTheme.colors.text.secondary,
								}}
							>
								{index + 1}
							</div>
							<button
								onClick={(e) => {
									e.stopPropagation();
									isFav
										? removeFromWatchlist(coin.id)
										: addToWatchlist(coin.id);
								}}
								className="hover:scale-110 transition-transform p-1"
							>
								<Star
									className="w-3.5 h-3.5"
									style={{
										color: isFav ? "#fbbf24" : cryptoTheme.colors.text.tertiary,
										fill: isFav ? "#fbbf24" : "none",
									}}
								/>
							</button>
							<CoinIcon symbol={coin.symbol} size="w-7 h-7" />
							<div className="flex-1">
								<p
									className="font-medium text-sm"
									style={{ color: cryptoTheme.colors.text.primary }}
								>
									{coin.symbol}
								</p>
								<p
									className="text-xs"
									style={{ color: cryptoTheme.colors.text.tertiary }}
								>
									{coin.name}
								</p>
							</div>
							<div
								className="text-xs font-medium"
								style={{ color: cryptoTheme.colors.text.secondary }}
							>
								#{coin.market_cap_rank}
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
