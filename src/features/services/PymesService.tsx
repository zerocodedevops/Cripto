import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Seo } from "@/components/common/SEO";
import { Layout } from "@/components/layout";

export default function PymesService() {
	const navigate = useNavigate();
	return (
		<Layout>
			<Seo
				title="Páginas Web para Pymes y Autónomos"
				description="Diseño web a medida para autónomos y pymes en Madrid. Páginas optimizadas para SEO, rápidas y fáciles de gestionar. Sin jerga técnica. ¡Eleva tu negocio hoy!"
				keywords="diseño web pymes, paginas web autonomos, crear web negocio, diseño web madrid"
			/>

			<div className="pt-32 pb-20">
				<div className="container-custom">
					{/* Hero Section Page */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="max-w-4xl mx-auto text-center mb-20"
					>
						<h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
							Páginas web profesionales para que tu negocio{" "}
							<span className="text-gradient">no deje de crecer</span>
						</h1>
						<p className="text-xl text-dark-400 leading-relaxed">
							Una web que escala contigo: soluciones reales para autónomos y
							pequeñas empresas que necesitan resultados, no complicaciones.
						</p>
					</motion.div>

					{/* Content Section */}
					<div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl font-bold text-white mb-6">
								Todo lo que tu negocio necesita (y nada de lo que no)
							</h2>
							<div className="space-y-6">
								<FeatureItem
									title="Diseño Personalizado"
									description="Nada de plantillas clónicas. Tu marca es única y tu web debe reflejar tu profesionalidad."
								/>
								<FeatureItem
									title="Optimización Móvil (Responsive)"
									description="Tu web se verá perfecta en teléfonos, tablets y ordenadores. Donde están tus clientes."
								/>
								<FeatureItem
									title="SEO On-Page Básico"
									description="Configuramos los cimientos para que Google te encuentre por tus servicios principales desde el primer día."
								/>
								<FeatureItem
									title="Velocidad de Carga Relámpago"
									description="Evitamos que el cliente se vaya por esperar. Webs ligeras y extremadamente rápidas."
								/>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="bg-dark-900/50 border border-dark-800 p-8 rounded-2xl"
						>
							<h3 className="text-2xl font-bold text-white mb-6">
								Problemas que resolvemos
							</h3>
							<ul className="space-y-4 text-dark-400">
								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
									<span>
										Dejar de depender exclusivamente de las redes sociales.
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
									<span>
										Tener una oficina virtual abierta las 24 horas del día.
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
									<span>
										Transmitir una imagen de confianza y seriedad ante nuevos
										clientes.
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
									<span>
										Desarrollo potenciado por IA para obtener una web
										profesional en tiempo récord.
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
									<span>
										Código limpio y optimizado, generado con las mejores
										prácticas AI-First.
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
									<span>
										Automatizar la recepción de consultas y peticiones de
										presupuesto.
									</span>
								</li>
							</ul>
							<div className="mt-10">
								<button
									onClick={() => {
										navigate("/");
										setTimeout(() => {
											document
												.querySelector("#contact")
												?.scrollIntoView({ behavior: "smooth" });
										}, 100);
									}}
									className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all"
								>
									Pide presupuesto hoy mismo
								</button>
							</div>
						</motion.div>
					</div>

					{/* FAQ Section */}
					<div className="max-w-3xl mx-auto mb-24">
						<h2 className="text-3xl font-bold text-white text-center mb-12">
							Preguntas Frecuentes
						</h2>
						<div className="space-y-8">
							<FaqItem
								question="¿Cuánto tarda en estar lista?"
								answer="Una web estándar para autónomos suele estar lista en un plazo de 2 a 4 semanas, dependiendo de la rapidez con la que tengamos el contenido."
							/>
							<FaqItem
								question="¿Tengo que saber de informática para gestionar mi web?"
								answer="Para nada. Te entregamos la web lista y te damos una formación básica de 30 minutos para que puedas cambiar textos o fotos tú mismo sin depender de nadie."
							/>
							<FaqItem
								question="¿La web será mía al 100%?"
								answer="Sí. Siempre recomendamos que el dominio y el hosting estén a tu nombre. Nosotros te ayudamos con la gestión técnica, pero tú eres el dueño legal de todo."
							/>
							<FaqItem
								question="¿Tengo que pagar una cuota mensual obligatoria?"
								answer="No. Una vez entregada la web, es tuya. Solo ofrecemos servicios de mantenimiento opcionales si prefieres que nosotros nos encarguemos de las actualizaciones de seguridad."
							/>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

function FeatureItem({
	title,
	description,
}: {
	readonly title: string;
	readonly description: string;
}) {
	return (
		<div className="flex gap-4">
			<div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 h-fit">
				<ShieldCheck className="w-6 h-6" />
			</div>
			<div>
				<h4 className="text-xl font-bold text-white mb-2">{title}</h4>
				<p className="text-dark-400">{description}</p>
			</div>
		</div>
	);
}

function FaqItem({
	question,
	answer,
}: {
	readonly question: string;
	readonly answer: string;
}) {
	return (
		<div className="border-b border-dark-800 pb-6">
			<h4 className="text-xl font-bold text-primary-400 mb-2">{question}</h4>
			<p className="text-dark-400 leading-relaxed">{answer}</p>
		</div>
	);
}
