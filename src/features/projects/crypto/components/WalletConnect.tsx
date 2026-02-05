import { Check, Copy, LogOut, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { cryptoTheme } from "../utils/cryptoTheme";

export function WalletConnect() {
	const [address, setAddress] = useState<string | null>(null);
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		const saved = localStorage.getItem("wallet-address");
		if (saved) setAddress(saved);
	}, []);

	const connectWallet = () => {
		// Mock connection
		const mockAddress = "0x71C...9A21";
		setAddress(mockAddress);
		localStorage.setItem("wallet-address", mockAddress);
	};

	const disconnect = () => {
		setAddress(null);
		localStorage.removeItem("wallet-address");
	};

	const copyAddress = () => {
		if (!address) return;
		navigator.clipboard.writeText("0x71C7656EC7ab88b098defB751B7401B5f6d89A21"); // Full mock address
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	if (!address) {
		return (
			<button
				onClick={connectWallet}
				className="px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 flex items-center gap-2"
				style={{
					background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
					color: "white",
					boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
				}}
			>
				<Wallet className="w-4 h-4" />
				Conectar Wallet
			</button>
		);
	}

	return (
		<div className="relative group">
			<button
				className="px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 border transition-all"
				style={{
					background: cryptoTheme.colors.bg.tertiary,
					borderColor: cryptoTheme.colors.border.primary,
					color: cryptoTheme.colors.text.primary,
				}}
			>
				<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
				{address}
			</button>

			{/* Dropdown */}
			<div
				className="absolute right-0 mt-2 w-48 py-2 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 transform translate-y-2 group-hover:translate-y-0"
				style={{
					background: cryptoTheme.colors.bg.secondary,
					border: `1px solid ${cryptoTheme.colors.border.primary}`,
				}}
			>
				<div className="px-4 py-2 border-b border-white/5">
					<p className="text-xs opacity-50">Balance (ETH)</p>
					<p className="font-bold">1.45 ETH</p>
				</div>
				<button
					onClick={copyAddress}
					className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 flex items-center gap-2"
				>
					{isCopied ? (
						<Check className="w-3 h-3 text-green-500" />
					) : (
						<Copy className="w-3 h-3" />
					)}
					Copiar Dirección
				</button>
				<button
					onClick={disconnect}
					className="w-full text-left px-4 py-2 text-sm hover:bg-red-500/10 text-red-400 flex items-center gap-2"
				>
					<LogOut className="w-3 h-3" />
					Desconectar
				</button>
			</div>
		</div>
	);
}
