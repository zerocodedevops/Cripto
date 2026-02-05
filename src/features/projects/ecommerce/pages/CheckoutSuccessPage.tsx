import confetti from "canvas-confetti";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import { trackEvent } from "@/lib/analytics";

export default function CheckoutSuccessPage() {
	const navigate = useNavigate();
	const orderId = `ORD-${Math.floor(Math.random() * 1000000)
		.toString()
		.padStart(6, "0")}`;

	useEffect(() => {
		trackEvent("Shop", "PurchaseSuccess", orderId);

		// Trigger confetti
		const duration = 3000;
		const end = Date.now() + duration;

		const frame = () => {
			confetti({
				particleCount: 2,
				angle: 60,
				spread: 55,
				origin: { x: 0 },
				colors: ["#6366f1", "#10b981", "#f59e0b"],
			});
			confetti({
				particleCount: 2,
				angle: 120,
				spread: 55,
				origin: { x: 1 },
				colors: ["#6366f1", "#10b981", "#f59e0b"],
			});

			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		};
		frame();
	}, [orderId]);

	return (
		<div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 animate-fade-in">
			<div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-bounce-short">
				<CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
			</div>

			<h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				¡Pago Realizado con Éxito!
			</h1>

			<p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mb-8">
				Gracias por tu compra. Hemos enviado la confirmación a tu correo.
				<br />
				<span className="text-sm text-slate-400 mt-2 block">
					ID de Pedido: {orderId}
				</span>
			</p>

			<div className="flex gap-4">
				<Button
					variant="primary"
					rightIcon={<ShoppingBag className="w-5 h-5" />}
					onClick={() => navigate("/proyectos/ecommerce")}
				>
					Seguir Comprando
				</Button>
				<Button variant="outline" onClick={() => navigate("/")}>
					Volver al Portfolio
				</Button>
			</div>
		</div>
	);
}
