import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Minus, Plus, Trash2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, toggleCart, updateQuantity } from "../store/cartSlice";
import type { RootState } from "../store/store";

export default function CartSidebar() {
	const dispatch = useDispatch();
	const { items, isOpen } = useSelector((state: RootState) => state.cart);
	const total = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => dispatch(toggleCart())}
						className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
					/>
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
					>
						<div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
							<h2 className="text-xl font-bold text-slate-800">
								Tu Cesta ({items.length})
							</h2>
							<button
								onClick={() => dispatch(toggleCart())}
								className="p-2 hover:bg-slate-100 rounded-full transition-colors"
							>
								<X className="w-5 h-5 text-slate-500" />
							</button>
						</div>

						<div className="flex-1 overflow-y-auto p-4 space-y-4">
							{items.length === 0 ? (
								<div className="h-full flex flex-col items-center justify-center text-center p-8">
									<div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
										<CreditCard className="w-8 h-8 text-slate-400" />
									</div>
									<h3 className="text-lg font-medium text-slate-900 mb-2">
										Tu cesta está vacía
									</h3>
									<p className="text-slate-500 mb-6">
										¡Descubre nuestros productos y empieza a comprar!
									</p>
									<button
										onClick={() => dispatch(toggleCart())}
										className="text-indigo-600 font-medium hover:text-indigo-800"
									>
										Seguir comprando
									</button>
								</div>
							) : (
								items.map((item) => (
									<motion.div
										layout
										key={`${item.id}-${item.size || "default"}`}
										className="flex gap-4 p-3 bg-white border border-slate-100 rounded-xl shadow-sm"
									>
										<div className="w-20 h-20 bg-white rounded-lg p-2 border border-slate-100 flex-shrink-0">
											<img
												src={item.image}
												alt={item.title}
												className="w-full h-full object-contain"
											/>
										</div>
										<div className="flex-1 flex flex-col justify-between">
											<div>
												<div className="flex justify-between items-start gap-2">
													<h3 className="font-medium text-slate-800 line-clamp-1">
														{item.title}
													</h3>
													{item.size && (
														<span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200">
															{item.size}
														</span>
													)}
												</div>
												<p className="text-slate-400 text-sm">{item.price}€</p>
											</div>
											<div className="flex justify-between items-center mt-2">
												<div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1">
													<button
														onClick={() =>
															dispatch(
																updateQuantity({
																	id: item.id,
																	size: item.size,
																	quantity: item.quantity - 1,
																}),
															)
														}
														className="p-1 hover:bg-white hover:shadow-sm rounded transition-all"
													>
														<Minus className="w-3 h-3 text-slate-600" />
													</button>
													<span className="text-xs font-medium w-4 text-center">
														{item.quantity}
													</span>
													<button
														onClick={() =>
															dispatch(
																updateQuantity({
																	id: item.id,
																	size: item.size,
																	quantity: item.quantity + 1,
																}),
															)
														}
														className="p-1 hover:bg-white hover:shadow-sm rounded transition-all"
													>
														<Plus className="w-3 h-3 text-slate-600" />
													</button>
												</div>
												<button
													onClick={() =>
														dispatch(
															removeFromCart({ id: item.id, size: item.size }),
														)
													}
													className="text-red-400 hover:text-red-500 p-1"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
										</div>
									</motion.div>
								))
							)}
						</div>

						{items.length > 0 && (
							<div className="p-4 border-t border-slate-100 bg-slate-50/50">
								<div className="flex justify-between items-center mb-4">
									<span className="text-slate-500">Subtotal</span>
									<span className="text-xl font-bold text-slate-900">
										{total.toFixed(2)}€
									</span>
								</div>
								<Link
									to="/proyectos/ecommerce/checkout"
									onClick={() => dispatch(toggleCart())}
									className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3 rounded-xl font-medium shadow-lg shadow-indigo-200 transition-all hover:shadow-indigo-300"
								>
									Tramitar Pedido
								</Link>
							</div>
						)}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
