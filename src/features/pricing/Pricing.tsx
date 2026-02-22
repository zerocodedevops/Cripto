import { motion } from "framer-motion";
import { Building2, Check, Info, User } from "lucide-react";
import { Seo } from "@/components/common/SEO";
import { Layout } from "@/components/layout";
import { PricingConfigurator } from "./PricingConfigurator";

export default function Pricing() {
	return (
		<Layout>
			<Seo
				title="Precios y Packs de Páginas Web"
				description="¿Cuánto cuesta una web? Descubre nuestros packs para autónomos y pymes. Transparencia total y calidad profesional. Desde 700€."
				keywords="precio diseño web, tarifas web autonomos, presupuesto web pyme"
			/>

			<div className="pt-32 pb-40">
				<div className="container-custom">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="max-w-4xl mx-auto text-center mb-20"
					>
						<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
							Tarifas y Packs:{" "}
							<span className="text-gradient">Transparencia Total</span>
						</h1>
						<p className="text-xl text-dark-400">
							Elige un pack base o configura tu presupuesto a medida según las
							secciones que necesite tu negocio.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-8 mb-32 max-w-5xl mx-auto">
						<PricingCard
							icon={User}
							title="Pack Básico"
							price="700€"
							originalPrice="1.760€"
							description="Todo lo esencial para una presencia web profesional y legal."
							features={[
								"Página de Inicio",
								"Servicios",
								"Contacto",
								"Ubicación y Horarios",
								'Diseño "Responsive"',
								"Certificado SSL (HTTPS)",
								"Hosting (1 año)",
								"Dominio (1 año)",
								"Soporte Técnico Averías (1 año)",
								"RGPD Completo (4 Productos)",
							]}
						/>
						<PricingCard
							icon={Building2}
							title="Pack Silver"
							price="1.400€"
							originalPrice="2.940€"
							featured={true}
							description="Web completa optimizada con diseño profesional y SEO Google."
							features={[
								"Todo del Pack Básico",
								"Nuestro Equipo",
								"Enlace a WhatsApp y RR.SS.",
								"SEO Google",
								"Optimización Velocidad",
								"Email Corporativo",
								"Actualización Mensual (1 año)",
							]}
						/>
					</div>

					<div className="max-w-4xl mx-auto bg-dark-900/30 border border-dark-800 p-10 rounded-3xl">
						<div className="flex gap-4 items-start mb-6">
							<Info className="w-8 h-8 text-primary-500 mt-1 shrink-0" />
							<div>
								<h2 className="text-2xl font-bold text-white mb-4">
									¿Por qué no hago webs de 200€?
								</h2>
								<p className="text-dark-400 leading-relaxed mb-4">
									Seguramente has visto ofertas que parecen increíbles. Sin
									embargo, en el diseño web,{" "}
									<strong>lo barato sale caro</strong>. Una web de bajo coste
									suele ser una plantilla genérica que no carga bien, no está
									optimizada para SEO y no genera confianza en tus clientes.
								</p>
								<p className="text-dark-400 leading-relaxed">
									En ZeroCode dedicamos horas a cada proyecto para asegurar que
									tu inversión sea rentable. No estás comprando "píxeles", estás
									comprando una <strong>estrategia de negocio</strong>.
								</p>
							</div>
						</div>
					</div>

					{/* New Interactive Configurator Section */}
					<div className="mt-32">
						<div className="text-center mb-12">
							<h2 className="text-2xl md:text-4xl font-bold text-white mb-4 italic">
								¿Quieres un presupuesto a medida?
							</h2>
							<p className="text-dark-400">
								Selecciona exactamente lo que necesitas y obtén una estimación
								instantánea.
							</p>
						</div>
						<PricingConfigurator />
					</div>
				</div>
			</div>
		</Layout>
	);
}

function PricingCard({
	icon: Icon,
	title,
	price,
	originalPrice,
	description,
	features,
	featured = false,
}: any) {
	return (
		<motion.div
			whileHover={{ y: -10 }}
			className={`relative p-8 rounded-3xl border ${featured ? "border-primary-500 bg-primary-500/5 shadow-glow" : "border-dark-800 bg-dark-950"} flex flex-col`}
		>
			{featured && (
				<div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-sm font-bold rounded-full">
					Más popular
				</div>
			)}

			<div className="mb-6 p-4 rounded-2xl bg-dark-900 w-fit">
				<Icon className="w-8 h-8 text-primary-400" />
			</div>

			<h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
			<div className="flex items-baseline gap-2 mb-4">
				<span className="text-sm text-dark-500 line-through">
					{originalPrice}
				</span>
				<span className="text-4xl font-bold text-white">{price}</span>
			</div>
			<p className="text-dark-400 text-sm mb-8">{description}</p>

			<ul className="space-y-4 mb-10 flex-grow">
				{features.map((feature: string) => (
					<li
						key={feature}
						className="flex items-center gap-3 text-dark-300 text-sm"
					>
						<Check className="w-4 h-4 text-primary-500 shrink-0" />
						<span>{feature}</span>
					</li>
				))}
			</ul>

			<button
				className={`w-full py-4 rounded-xl font-bold transition-all ${featured ? "bg-primary-600 hover:bg-primary-500 text-white" : "bg-dark-800 hover:bg-dark-700 text-white"}`}
			>
				Elegir este plan
			</button>
		</motion.div>
	);
}
