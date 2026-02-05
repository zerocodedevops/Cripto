import { ArrowRightLeft, Search } from "lucide-react";
import { useState } from "react";
import { useCryptoPrice } from "../hooks/useCryptoPrice";
import { useCurrencyFormat } from "../hooks/useCurrencyFormat";
import { cryptoTheme } from "../utils/cryptoTheme";

export function CryptoComparator() {
	const { data: coins, isLoading } = useCryptoPrice({ per_page: 100 });
	const { formatCurrency } = useCurrencyFormat();

	const [coinA, setCoinA] = useState("bitcoin");
	const [coinB, setCoinB] = useState("ethereum");

	const dataA = coins?.find((c) => c.id === coinA);
	const dataB = coins?.find((c) => c.id === coinB);

	if (isLoading || !coins) return null;

	return (
		<div
			className="p-6 rounded-2xl border backdrop-blur-xl"
			style={{
				...cryptoTheme.effects.glass,
				borderColor: cryptoTheme.colors.border.primary,
			}}
		>
			<div className="flex items-center gap-3 mb-6">
				<div
					className="w-10 h-10 rounded-xl flex items-center justify-center"
					style={{ background: `${cryptoTheme.colors.primary.electric}20` }}
				>
					<ArrowRightLeft
						className="w-5 h-5"
						style={{ color: cryptoTheme.colors.primary.electric }}
					/>
				</div>
				<h3
					className="text-lg font-bold"
					style={{ color: cryptoTheme.colors.text.primary }}
				>
					Comparador de Criptos
				</h3>
			</div>

			<div className="grid grid-cols-2 gap-4 mb-6">
				{/* Selector A */}
				<div className="relative">
					<select
						value={coinA}
						onChange={(e) => setCoinA(e.target.value)}
						className="w-full p-2 pl-8 rounded-lg outline-none appearance-none cursor-pointer text-sm font-bold"
						style={{
							background: cryptoTheme.colors.bg.secondary,
							color: cryptoTheme.colors.text.primary,
							border: `1px solid ${cryptoTheme.colors.border.secondary}`,
						}}
					>
						{coins.map((c) => (
							<option key={c.id} value={c.id}>
								{c.name}
							</option>
						))}
					</select>
					<Search className="absolute left-2.5 top-2.5 w-4 h-4 opacity-50" />
				</div>

				{/* Selector B */}
				<div className="relative">
					<select
						value={coinB}
						onChange={(e) => setCoinB(e.target.value)}
						className="w-full p-2 pl-8 rounded-lg outline-none appearance-none cursor-pointer text-sm font-bold"
						style={{
							background: cryptoTheme.colors.bg.secondary,
							color: cryptoTheme.colors.text.primary,
							border: `1px solid ${cryptoTheme.colors.border.secondary}`,
						}}
					>
						{coins.map((c) => (
							<option key={c.id} value={c.id}>
								{c.name}
							</option>
						))}
					</select>
					<Search className="absolute left-2.5 top-2.5 w-4 h-4 opacity-50" />
				</div>
			</div>

			{/* Comparison Table */}
			<div className="space-y-4">
				{/* Header */}
				<div className="grid grid-cols-3 text-xs font-bold opacity-50 text-center uppercase tracking-wider">
					<div className="text-left">Métrica</div>
					<div>{dataA?.symbol?.toUpperCase()}</div>
					<div>{dataB?.symbol?.toUpperCase()}</div>
				</div>

				{/* Rows */}
				<ComparisonRow
					label="Ranking"
					valA={`#${dataA?.market_cap_rank}`}
					valB={`#${dataB?.market_cap_rank}`}
				/>
				<ComparisonRow
					label="Precio"
					valA={formatCurrency(dataA?.current_price || 0)}
					valB={formatCurrency(dataB?.current_price || 0)}
					highlight
				/>
				<ComparisonRow
					label="Cap. Mercado"
					valA={formatCurrency(dataA?.market_cap || 0)}
					valB={formatCurrency(dataB?.market_cap || 0)}
				/>
				<ComparisonRow
					label="Volumen 24h"
					valA={formatCurrency(dataA?.total_volume || 0)}
					valB={formatCurrency(dataB?.total_volume || 0)}
				/>
				<ComparisonRow
					label="Cambio 24h"
					valA={`${dataA?.price_change_percentage_24h.toFixed(2)}%`}
					valB={`${dataB?.price_change_percentage_24h.toFixed(2)}%`}
					colorA={
						dataA?.price_change_percentage_24h &&
						dataA.price_change_percentage_24h >= 0
							? "text-green-500"
							: "text-red-500"
					}
					colorB={
						dataB?.price_change_percentage_24h &&
						dataB.price_change_percentage_24h >= 0
							? "text-green-500"
							: "text-red-500"
					}
				/>
			</div>
		</div>
	);
}

function ComparisonRow({
	label,
	valA,
	valB,
	highlight = false,
	colorA,
	colorB,
}: {
	label: string;
	valA: string;
	valB: string;
	highlight?: boolean;
	colorA?: string;
	colorB?: string;
}) {
	return (
		<div
			className={`grid grid-cols-3 items-center py-3 border-b border-white/5 last:border-0 ${highlight ? "bg-white/5 rounded-lg px-2 -mx-2" : ""}`}
		>
			<div className="text-sm opacity-70">{label}</div>
			<div className={`text-center font-bold text-sm ${colorA || ""}`}>
				{valA}
			</div>
			<div className={`text-center font-bold text-sm ${colorB || ""}`}>
				{valB}
			</div>
		</div>
	);
}
