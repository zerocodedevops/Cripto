import { motion } from "framer-motion";
import { Clock, ExternalLink, Newspaper } from "lucide-react";
import { cryptoTheme } from "../utils/cryptoTheme";

interface NewsItem {
	id: string;
	title: string;
	source: string;
	time: string;
	url: string;
	sentiment: "positive" | "negative" | "neutral";
}

const MOCK_NEWS: NewsItem[] = [
	{
		id: "1",
		title: "Bitcoin supera los $100k en simulaciones de mercado global",
		source: "CryptoDaily",
		time: "2m ago",
		url: "#",
		sentiment: "positive",
	},
	{
		id: "2",
		title: "Ethereum 3.0: Vitalik anuncia nueva hoja de ruta centrada en IA",
		source: "EthNews",
		time: "15m ago",
		url: "#",
		sentiment: "positive",
	},
	{
		id: "3",
		title: "Regulaciones en Europa: MiCA entra en fase final de aprobación",
		source: "CoinTelegraph",
		time: "45m ago",
		url: "#",
		sentiment: "neutral",
	},
	{
		id: "4",
		title: "Solana detiene su red brevemente por congestión de memecoins",
		source: "SolanaStatus",
		time: "1h ago",
		url: "#",
		sentiment: "negative",
	},
	{
		id: "5",
		title: "BlackRock lanza nuevo ETF de criptomonedas enfocado en privacidad",
		source: "Bloomberg",
		time: "2h ago",
		url: "#",
		sentiment: "positive",
	},
];

const getSentimentColor = (sentiment: string) => {
	if (sentiment === "positive") return cryptoTheme.colors.status.bullish;
	if (sentiment === "negative") return cryptoTheme.colors.status.bearish;
	return cryptoTheme.colors.text.secondary;
};

import { useTranslation } from "react-i18next";

// ... (interfaces remain same)

export function NewsFeed() {
	const { t } = useTranslation();

	return (
		<div
			className="p-6 rounded-2xl border backdrop-blur-xl h-full"
			style={{
				...cryptoTheme.effects.glass,
				borderColor: cryptoTheme.colors.border.primary,
			}}
		>
			<div className="flex items-center gap-2 mb-6">
				<div
					className="w-8 h-8 rounded-lg flex items-center justify-center"
					style={{ background: "rgba(59, 130, 246, 0.1)" }}
				>
					<Newspaper className="w-5 h-5 text-blue-500" />
				</div>
				<h3
					className="text-lg font-bold"
					style={{ color: cryptoTheme.colors.text.primary }}
				>
					{t("crypto.sections.news")}
				</h3>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
				{MOCK_NEWS.map((news, i) => (
					<motion.a
						key={news.id}
						href={news.url}
						target="_blank"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.1 }}
						className="flex flex-col justify-between p-4 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/10 h-full"
						style={{ background: "rgba(255,255,255,0.02)" }}
					>
						<div>
							<div className="flex justify-between items-start mb-3">
								<span
									className="text-xs font-bold px-2 py-1 rounded-md"
									style={{
										background: cryptoTheme.colors.bg.tertiary,
										color: cryptoTheme.colors.text.secondary,
									}}
								>
									{news.source}
								</span>
								<span
									className="flex items-center gap-1 text-xs"
									style={{ color: cryptoTheme.colors.text.tertiary }}
								>
									<Clock className="w-3 h-3" />
									{news.time}
								</span>
							</div>

							<h4
								className="font-bold text-sm mb-3 leading-relaxed group-hover:text-blue-400 transition-colors line-clamp-2"
								style={{ color: cryptoTheme.colors.text.primary }}
							>
								{news.title}
							</h4>
						</div>

						<div className="flex items-center justify-between text-xs mt-2 pt-3 border-t border-white/5">
							<span
								className="font-medium"
								style={{
									color: getSentimentColor(news.sentiment),
								}}
							>
								{news.sentiment.charAt(0).toUpperCase() +
									news.sentiment.slice(1)}
							</span>
							<ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
						</div>
					</motion.a>
				))}
			</div>
		</div>
	);
}
