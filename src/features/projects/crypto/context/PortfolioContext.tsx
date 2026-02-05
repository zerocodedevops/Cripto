import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

export interface Transaction {
	id: string; // Unique ID for the transaction
	coinId: string;
	type: "buy" | "sell";
	amount: number;
	pricePerCoin: number;
	date: string;
}

export interface Holding {
	id: string;
	amount: number;
	avgBuyPrice: number;
}

interface PortfolioContextType {
	transactions: Transaction[];
	holdings: Holding[];
	addTransaction: (tx: Omit<Transaction, "id">) => void;
	removeTransaction: (id: string) => void;
	getHolding: (id: string) => Holding | undefined;
	portfolioValue: number;
	totalInvested: number;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
	undefined,
);

export function PortfolioProvider({
	children,
}: {
	readonly children: ReactNode;
}) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	// Load from localStorage
	useEffect(() => {
		const saved = localStorage.getItem("crypto-portfolio-v2"); // New version key
		if (saved) {
			try {
				setTransactions(JSON.parse(saved));
			} catch (e) {
				console.error("Portfolio parse error", e);
			}
		} else {
			// Initial Mock Data (Simulating a history)
			setTransactions([
				{
					id: "1",
					coinId: "bitcoin",
					type: "buy",
					amount: 0.5,
					pricePerCoin: 45000,
					date: new Date().toISOString(),
				},
				{
					id: "2",
					coinId: "ethereum",
					type: "buy",
					amount: 10,
					pricePerCoin: 2500,
					date: new Date().toISOString(),
				},
			]);
		}
	}, []);

	// Save changes
	useEffect(() => {
		localStorage.setItem("crypto-portfolio-v2", JSON.stringify(transactions));
	}, [transactions]);

	// Derive Holdings from Transactions
	const holdings = useMemo(() => {
		const map = new Map<string, Holding>();

		transactions.forEach((tx) => {
			const current = map.get(tx.coinId) || {
				id: tx.coinId,
				amount: 0,
				avgBuyPrice: 0,
			};

			if (tx.type === "buy") {
				const totalCost =
					current.amount * current.avgBuyPrice + tx.amount * tx.pricePerCoin;
				const newAmount = current.amount + tx.amount;
				current.avgBuyPrice = newAmount > 0 ? totalCost / newAmount : 0;
				current.amount = newAmount;
			} else {
				// Sell logic: reduces amount but keeps avgBuyPrice same (FIFO/Weighted avg usually keeps basis same until empty)
				// Simplified: reducing amount.
				current.amount = Math.max(0, current.amount - tx.amount);
			}

			if (current.amount > 0) {
				map.set(tx.coinId, current);
			} else {
				map.delete(tx.coinId);
			}
		});

		return Array.from(map.values());
	}, [transactions]);

	const addTransaction = (tx: Omit<Transaction, "id">) => {
		const newTx = { ...tx, id: crypto.randomUUID() };
		setTransactions((prev) => [...prev, newTx]);
	};

	const removeTransaction = (id: string) => {
		setTransactions((prev) => prev.filter((tx) => tx.id !== id));
	};

	const getHolding = (id: string) => holdings.find((h) => h.id === id);

	const value = useMemo(
		() => ({
			transactions,
			holdings,
			addTransaction,
			removeTransaction,
			getHolding,
			portfolioValue: 0, // Calculated in UI
			totalInvested: holdings.reduce(
				(acc, h) => acc + h.amount * h.avgBuyPrice,
				0,
			),
		}),
		[transactions, holdings],
	);

	return (
		<PortfolioContext.Provider value={value}>
			{children}
		</PortfolioContext.Provider>
	);
}

export function usePortfolio() {
	const context = useContext(PortfolioContext);
	if (!context) {
		throw new Error("usePortfolio must be used within a PortfolioProvider");
	}
	return context;
}
