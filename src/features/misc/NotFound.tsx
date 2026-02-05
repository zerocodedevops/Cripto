import { motion } from "framer-motion";
import { AlertTriangle, Home } from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line
import { Button } from "@/components/ui";

export default function NotFound() {
	return (
		<section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-950 text-dark-100">
			{/* Background decoration */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
			</div>

			<div className="container-custom relative z-10 text-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="mb-8 flex justify-center"
				>
					<div className="p-6 rounded-full bg-dark-800/50 border border-primary-500/30 text-primary-400 relative">
						<div className="absolute inset-0 bg-primary-500/10 rounded-full blur-lg animate-pulse" />
						<AlertTriangle className="w-16 h-16 relative z-10" />
					</div>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="heading-1 mb-4"
				>
					404
				</motion.h1>

				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="heading-3 text-dark-200 mb-6"
				>
					Página no encontrada
				</motion.h2>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="text-lg text-dark-400 max-w-md mx-auto mb-8"
				>
					Parece que la IA no ha generado esta ruta todavía, o te has desviado
					del camino.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
				>
					<Link to="/">
						<Button variant="primary" leftIcon={<Home className="w-5 h-5" />}>
							Volver al inicio
						</Button>
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
