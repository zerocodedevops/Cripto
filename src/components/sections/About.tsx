import { motion } from "framer-motion";
import { Bot, Globe, MapPin, Zap } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";

export function About() {
	return (
		<section id="about" className="section relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent-500/10 to-transparent" />
				<div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary-500/10 to-transparent" />
			</div>

			<div className="container-custom relative z-10">
				<motion.div
					variants={fadeInUp}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="text-center mb-12"
				>
					<h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
						Sobre <span className="text-gradient">Mí</span>
					</h2>
					<p className="text-xl text-dark-300 font-medium">
						Un desarrollador diferente con un enfoque innovador
					</p>
				</motion.div>

				<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
					{/* Left Column: DevOps Profile Card */}
					<motion.div
						className="w-full lg:w-1/2"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeInUp}
					>
						<div className="relative group">
							<div className="absolute -inset-0.5 bg-gradient-to-br from-primary-500 to-accent-500 rounded-[2rem] opacity-50 blur-lg group-hover:opacity-75 transition duration-500" />

							<div className="relative bg-dark-900/90 backdrop-blur-xl border border-dark-700/50 rounded-[2rem] p-8 overflow-hidden">
								<div className="flex items-center gap-5 mb-8">
									<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
										<Bot className="w-8 h-8 text-white" />
									</div>
									<div>
										<h3 className="text-2xl font-bold text-white font-outfit">
											ZeroCode
										</h3>
										<p className="text-primary-400 font-medium">
											AI-First Development
										</p>
									</div>
								</div>

								{/* Metrics Grid */}
								<div className="grid grid-cols-2 gap-4">
									<div className="bg-dark-800/50 rounded-2xl p-5 border border-dark-700/50 hover:border-primary-500/30 transition-colors group/item">
										<div className="text-3xl font-bold text-neon-cyan mb-1 group-hover/item:scale-110 transition-transform origin-left">
											100%
										</div>
										<div className="text-sm text-dark-400 font-medium">
											Personalizado
										</div>
									</div>
									<div className="bg-dark-800/50 rounded-2xl p-5 border border-dark-700/50 hover:border-primary-500/30 transition-colors group/item">
										<div className="text-3xl font-bold text-neon-purple mb-1 group-hover/item:scale-110 transition-transform origin-left">
											AI
										</div>
										<div className="text-sm text-dark-400 font-medium">
											Potenciado
										</div>
									</div>
									<div className="bg-dark-800/50 rounded-2xl p-5 border border-dark-700/50 hover:border-primary-500/30 transition-colors group/item">
										<div className="text-3xl font-bold text-emerald-400 mb-1 group-hover/item:scale-110 transition-transform origin-left">
											Rivas
										</div>
										<div className="text-sm text-dark-400 font-medium">
											Ubicación
										</div>
									</div>
									<div className="bg-dark-800/50 rounded-2xl p-5 border border-dark-700/50 hover:border-primary-500/30 transition-colors group/item">
										<div className="text-3xl font-bold text-amber-400 mb-1 group-hover/item:scale-110 transition-transform origin-left">
											Quick
										</div>
										<div className="text-sm text-dark-400 font-medium">
											Lanzamiento
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Right Column: Text Content */}
					<motion.div
						className="w-full lg:w-1/2"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						<div className="space-y-6">
							<div className="bg-dark-800/50 p-6 rounded-2xl border border-dark-700/50 hover:border-primary-500/30 transition-all group">
								<div className="flex items-center gap-3 mb-2">
									<Globe className="w-5 h-5 text-primary-400" />
									<h3 className="text-xl font-bold text-white group-hover:text-primary-400">
										Presencia Digital de Élite
									</h3>
								</div>
								<p className="text-dark-400">
									Diseñamos webs que no solo son estéticamente impecables, sino
									que están construidas para convertir visitantes en clientes
									desde el primer día.
								</p>
							</div>

							<div className="bg-dark-800/50 p-6 rounded-2xl border border-dark-700/50 hover:border-accent-500/30 transition-all group">
								<div className="flex items-center gap-3 mb-2">
									<Zap className="w-5 h-5 text-accent-400" />
									<h3 className="text-xl font-bold text-white group-hover:text-accent-400">
										Desarrollo Potenciado por IA
									</h3>
								</div>
								<p className="text-dark-400">
									Utilizamos Inteligencia Artificial para acelerar el proceso
									creativo y técnico, entregando resultados de alta gama en una
									fracción del tiempo habitual.
								</p>
							</div>

							<div className="bg-dark-800/50 p-6 rounded-2xl border border-dark-700/50 hover:border-neon-purple/30 transition-all group">
								<div className="flex items-center gap-3 mb-2">
									<MapPin className="w-5 h-5 text-neon-purple" />
									<h3 className="text-xl font-bold text-white group-hover:text-neon-purple">
										Trato Directo y Local
									</h3>
								</div>
								<p className="text-dark-400">
									Sin intermediarios ni agencias impersonales. Un profesional
									dedicado en Madrid para que tu visión se haga realidad con
									total transparencia.
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
