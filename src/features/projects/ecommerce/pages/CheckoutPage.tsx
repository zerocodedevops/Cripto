import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { type CartState, clearCart } from "../store/cartSlice";
import type { RootState } from "../store/store";

// Initialize Stripe (Test Mode)
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx"); // Public Test Key

function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [showToast, setShowToast] = useState(false);

	const { items } = useSelector((state: RootState) => state.cart as CartState);
	const total = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!stripe || !elements) return;

		setLoading(true);

		// Simulate API call for Demo purposes (Always succeeds)
		setTimeout(() => {
			console.log("[Demo] Payment Successful");
			setLoading(false);
			dispatch(clearCart());
			navigate("/proyectos/ecommerce/checkout/success");
		}, 2000);
	};

	if (items.length === 0) {
		return <div className="text-center py-20">Tu carrito está vacío.</div>;
	}

	return (
		<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
			{/* Order Summary */}
			<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-slate-900">
				<h2 className="text-xl font-bold mb-6 flex items-center gap-2">
					<ShieldCheck className="w-5 h-5 text-indigo-600" />
					Resumen del Pedido
				</h2>
				<div className="space-y-4 max-h-96 overflow-y-auto pr-2">
					{items.map((item) => (
						<div
							key={item.id}
							className="flex justify-between items-center text-sm"
						>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-slate-50 rounded p-1">
									<img
										src={item.image}
										alt={item.title}
										className="w-full h-full object-contain"
									/>
								</div>
								<div>
									<p className="font-medium text-slate-700">{item.title}</p>
									<p className="text-slate-500">x{item.quantity}</p>
								</div>
							</div>
							<span className="font-medium">
								${(item.price * item.quantity).toFixed(2)}
							</span>
						</div>
					))}
				</div>
				<div className="border-t border-slate-100 mt-6 pt-4 flex justify-between items-center text-lg font-bold">
					<span>Total</span>
					<span>${total.toFixed(2)}</span>
				</div>
			</div>

			{/* Payment For */}
			<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-slate-900">
				<h2 className="text-xl font-bold mb-6 flex items-center gap-2">
					<Lock className="w-5 h-5 text-indigo-600" />
					Pago Seguro
				</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="card-element"
							className="block text-sm font-medium text-slate-700 mb-2"
						>
							Información de la Tarjeta
						</label>
						<div
							className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative z-10"
							style={{ isolation: "isolate" }}
						>
							<CardElement
								id="card-element"
								options={{
									hidePostalCode: true,
									style: {
										base: {
											fontSize: "16px",
											color: "#0f172a",
											fontFamily: '"Inter", sans-serif',
											"::placeholder": {
												color: "#94a3b8",
											},
											iconColor: "#4f46e5",
										},
										invalid: {
											color: "#ef4444",
											iconColor: "#ef4444",
										},
									},
								}}
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={!stripe || loading}
						className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-200"
					>
						{loading ? "Procesando..." : `Pagar $${total.toFixed(2)}`}
					</button>
					<p className="text-xs text-center text-slate-400 mt-4">
						Powered by Stripe (Test Mode). No se realizará ningún cargo real.
					</p>
				</form>
			</div>

			<Toast
				message="¡Pago procesado con éxito! Gracias por tu compra."
				type="success"
				isVisible={showToast}
				onClose={() => setShowToast(false)}
			/>
		</div>
	);
}

export default function CheckoutPage() {
	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm />
		</Elements>
	);
}
