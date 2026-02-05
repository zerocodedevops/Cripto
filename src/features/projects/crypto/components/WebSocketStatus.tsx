// WebSocket connection status indicator component
import { motion } from "framer-motion";
import { Activity, Wifi } from "lucide-react";
import { cryptoTheme } from "../utils/cryptoTheme";

interface WebSocketStatusProps {
	isConnected: boolean;
}

export function WebSocketStatus({ isConnected }: WebSocketStatusProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
			style={{
				background: isConnected
					? `${cryptoTheme.colors.status.bullish}20`
					: `${cryptoTheme.colors.chart.primary}20`,
				color: isConnected
					? cryptoTheme.colors.status.bullish
					: cryptoTheme.colors.chart.primary,
				border: `1px solid ${isConnected ? cryptoTheme.colors.status.bullish : cryptoTheme.colors.chart.primary}`,
			}}
		>
			{isConnected ? (
				<>
					<Wifi className="w-3.5 h-3.5" />
					<span>Live</span>
				</>
			) : (
				<>
					<Activity className="w-3.5 h-3.5" />
					<span>Simulado</span>
				</>
			)}
		</motion.div>
	);
}
