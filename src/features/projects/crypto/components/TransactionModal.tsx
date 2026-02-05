import { AnimatePresence, motion } from "framer-motion";
import { Calendar, DollarSign, Wallet, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCryptoPrice } from "../hooks/useCryptoPrice";
import { cryptoTheme } from "../utils/cryptoTheme";

interface TransactionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (tx: {
		coinId: string;
		type: "buy" | "sell";
		amount: number;
		pricePerCoin: number;
		date: string;
	}) => void;
}

export function TransactionModal({
	isOpen,
	onClose,
	onSubmit,
}: TransactionModalProps) {
	const [type, setType] = useState<"buy" | "sell">("buy");
	const [coinId, setCoinId] = useState("bitcoin");
	const [amount, setAmount] = useState("");
	const [price, setPrice] = useState("");
	const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

	// Fetch current price for auto-fill
	const { data: coins } = useCryptoPrice({ per_page: 100 });
	const selectedCoinData = coins?.find((c) => c.id === coinId);

	useEffect(() => {
		if (selectedCoinData && !price) {
			setPrice(selectedCoinData.current_price.toString());
		}
	}, [selectedCoinData, price]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!amount || !price || !coinId) return;

		onSubmit({
			coinId,
			type,
			amount: Number.parseFloat(amount),
			pricePerCoin: Number.parseFloat(price),
			date,
		});

		// Reset form
		setAmount("");
		setPrice("");
		onClose();
	};

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					className="w-full max-w-md rounded-2xl border overflow-hidden shadow-2xl"
					style={{
						background: cryptoTheme.colors.bg.secondary,
						borderColor: cryptoTheme.colors.border.primary,
					}}
				>
					{/* Header */}
					<div className="flex items-center justify-between p-6 border-b border-white/5">
						<h3
							className="text-xl font-bold"
							style={{ color: cryptoTheme.colors.text.primary }}
						>
							Añadir Transacción
						</h3>
						<button
							onClick={onClose}
							className="p-2 hover:bg-white/5 rounded-full transition-colors"
						>
							<X
								className="w-5 h-5"
								style={{ color: cryptoTheme.colors.text.secondary }}
							/>
						</button>
					</div>

					<form onSubmit={handleSubmit} className="p-6 space-y-6">
						{/* Type Selector */}
						<div className="flex bg-white/5 p-1 rounded-xl">
							<button
								type="button"
								onClick={() => setType("buy")}
								className={`flex-1 py-2 font-bold rounded-lg transition-all ${type === "buy" ? "bg-green-500 text-white" : "text-gray-400 hover:text-white"}`}
							>
								Comprar
							</button>
							<button
								type="button"
								onClick={() => setType("sell")}
								className={`flex-1 py-2 font-bold rounded-lg transition-all ${type === "sell" ? "bg-red-500 text-white" : "text-gray-400 hover:text-white"}`}
							>
								Vender
							</button>
						</div>

						{/* Asset Select */}
						<div>
							<label
								htmlFor="tx-coin-id"
								className="block text-sm font-medium mb-2"
								style={{ color: cryptoTheme.colors.text.secondary }}
							>
								Activo
							</label>
							<select
								id="tx-coin-id"
								value={coinId}
								onChange={(e) => {
									setCoinId(e.target.value);
									setPrice(""); // Reset price so it refetches
								}}
								className="w-full h-12 px-4 rounded-xl bg-black/20 border focus:border-blue-500 outline-none transition-colors appearance-none"
								style={{
									borderColor: cryptoTheme.colors.border.secondary,
									color: cryptoTheme.colors.text.primary,
								}}
							>
								{coins?.map((coin) => (
									<option key={coin.id} value={coin.id} className="bg-gray-900">
										{coin.name} ({coin.symbol.toUpperCase()})
									</option>
								))}
							</select>
						</div>

						{/* Amount & Price Row */}
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="tx-amount"
									className="block text-sm font-medium mb-2"
									style={{ color: cryptoTheme.colors.text.secondary }}
								>
									Cantidad
								</label>
								<div className="relative">
									<input
										id="tx-amount"
										type="number"
										step="any"
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
										placeholder="0.00"
										className="w-full h-12 pl-10 pr-4 rounded-xl bg-black/20 border focus:border-blue-500 outline-none transition-colors"
										style={{
											borderColor: cryptoTheme.colors.border.secondary,
											color: cryptoTheme.colors.text.primary,
										}}
										required
									/>
									<Wallet className="absolute left-3 top-3.5 w-5 h-5 opacity-50" />
								</div>
							</div>

							<div>
								<label
									htmlFor="tx-price"
									className="block text-sm font-medium mb-2"
									style={{ color: cryptoTheme.colors.text.secondary }}
								>
									Precio por Moneda
								</label>
								<div className="relative">
									<input
										id="tx-price"
										type="number"
										step="any"
										value={price}
										onChange={(e) => setPrice(e.target.value)}
										placeholder="0.00"
										className="w-full h-12 pl-10 pr-4 rounded-xl bg-black/20 border focus:border-blue-500 outline-none transition-colors"
										style={{
											borderColor: cryptoTheme.colors.border.secondary,
											color: cryptoTheme.colors.text.primary,
										}}
										required
									/>
									<DollarSign className="absolute left-3 top-3.5 w-5 h-5 opacity-50" />
								</div>
							</div>
						</div>

						{/* Date */}
						<div>
							<label
								htmlFor="tx-date"
								className="block text-sm font-medium mb-2"
								style={{ color: cryptoTheme.colors.text.secondary }}
							>
								Fecha
							</label>
							<div className="relative">
								<input
									id="tx-date"
									type="date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
									className="w-full h-12 pl-10 pr-4 rounded-xl bg-black/20 border focus:border-blue-500 outline-none transition-colors text-white calendar-picker-indicator:filter-invert"
									style={{
										borderColor: cryptoTheme.colors.border.secondary,
										color: cryptoTheme.colors.text.primary,
									}}
									required
								/>
								<Calendar className="absolute left-3 top-3.5 w-5 h-5 opacity-50" />
							</div>
						</div>

						{/* Submit */}
						<button
							type="submit"
							className="w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform"
							style={{
								background:
									type === "buy"
										? cryptoTheme.colors.status.bullish
										: cryptoTheme.colors.status.bearish,
								color: "#fff",
							}}
						>
							{type === "buy" ? "Confirmar Compra" : "Confirmar Venta"}
						</button>
					</form>
				</motion.div>
			</div>
		</AnimatePresence>
	);
}
