import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Info, X, XCircle } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
	message: string;
	type?: ToastType;
	isVisible: boolean;
	onClose: () => void;
	duration?: number;
}

const icons = {
	success: <CheckCircle className="w-5 h-5 text-green-500" />,
	error: <XCircle className="w-5 h-5 text-red-500" />,
	info: <Info className="w-5 h-5 text-blue-500" />,
};

const bgColors = {
	success: "bg-green-50 border-green-100",
	error: "bg-red-50 border-red-100",
	info: "bg-blue-50 border-blue-100",
};

export default function Toast({
	message,
	type = "success",
	isVisible,
	onClose,
	duration = 3000,
}: ToastProps) {
	useEffect(() => {
		if (isVisible && duration > 0) {
			const timer = setTimeout(onClose, duration);
			return () => clearTimeout(timer);
		}
	}, [isVisible, duration, onClose]);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, y: 50, scale: 0.9 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 20, scale: 0.95 }}
					className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${bgColors[type]} backdrop-blur-sm pr-10 min-w-[300px]`}
				>
					{icons[type]}
					<p className="text-sm font-medium text-slate-700">{message}</p>
					<button
						onClick={onClose}
						className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-black/5 transition-colors"
					>
						<X className="w-4 h-4" />
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
