import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, Zap, Phone, MapPin, BarChart3, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Seo } from "@/components/common/SEO";
import { Layout } from "@/components/layout";

export default function PymesService() {
	const navigate = useNavigate();

	const handleCtaClick = () => {
		navigate("/");
		setTimeout(() => {
			document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	};

	return (
		<Layout>
			<Seo
				title="Desarrollo Web Pymes Madrid | Páginas Web Autónomos"
				description="Creamos páginas web profesionales para pymes y autónomos en Madrid con diseño responsive, SEO local y enfoque en ventas."
				keywords="desarrollo web pymes madrid, paginas web autonomos madrid, diseño web madrid pymes, web para negocios locales madrid, desarrollo de tiendas online para pymes, creación de página web autónomos madrid"
				jsonLd={{
					"@context": "https://schema.org",
					"@type": "LocalBusiness",
					"name": "ZeroCode",
					"image": "https://zerocode-devops.web.app/og-image.png",
					"@id": "https://zerocode-devops.web.app/desarrollo-web-pymes-madrid/#localbusiness",
					"url": "https://zerocode-devops.web.app/desarrollo-web-pymes-madrid",
					"telephone": "+34 912 622 712",
					"address": {
						"@type": "PostalAddress",
						"streetAddress": "Madrid, Spain",
						"addressLocality": "Madrid",
						"postalCode": "28001",
						"addressCountry": "ES"
					},
					"geo": {
						"@type": "GeoCoordinates",
						"latitude": 40.416775,
						"longitude": -3.703790
					}
				}}
			/>

			<div className="pt-32 pb-20 bg-dark-950 text-dark-100">
				<div className="container-custom">
					{/* Hero Section / H1 */}
					<header className="max-w-4xl mx-auto text-center mb-20">
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
						>
							<h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
								Desarrollo web profesional para <span className="text-gradient">pymes y autónomos en Madrid</span>
							</h1>
							<p className="text-xl text-dark-400 mb-8 max-w-2xl mx-auto">
								Soluciones reales para autónomos y pequeñas empresas que necesitan resultados, no complicaciones. Impulsa tu presencia local hoy.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<button
									onClick={handleCtaClick}
									className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl shadow-glow transition-all flex items-center justify-center gap-2"
								>
									<Phone className="w-5 h-5" />
									Solicita presupuesto gratis
								</button>
								<button
									onClick={handleCtaClick}
									className="px-8 py-4 bg-dark-800 hover:bg-dark-700 text-white font-bold rounded-2xl border border-dark-700 transition-all flex items-center justify-center gap-2"
								>
									<MapPin className="w-5 h-5 text-accent-500" />
									Consulta con nuestro experto en Madrid
								</button>
							</div>
						</motion.div>
					</header>

					<div className="grid lg:grid-cols-3 gap-12 items-start">
						<div className="lg:col-span-2 space-y-16">
							{/* Sección Beneficios */}
							<section>
								<h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
									<BarChart3 className="text-primary-500" />
									Beneficios de tener una web optimizada para SEO y conversión
								</h2>
								<div className="prose prose-invert max-w-none text-dark-300">
									<p className="mb-6">
										En el competitivo mercado de Madrid, no basta con "estar" en internet. El <strong>desarrollo web pymes Madrid</strong> debe enfocarse en visibilidad y resultados tangibles.
									</p>
									<div className="grid sm:grid-cols-2 gap-6">
										<BenefitCard
											title="Visibilidad 24/7"
											desc="Tu negocio local en Madrid (ya sea en el Centro o en Chamberí) nunca cierra. Capta leads mientras duermes."
										/>
										<BenefitCard
											title="Autoridad de Marca"
											desc="Una página web profesional proyecta la seriedad que tus clientes buscan en el barrio de Salamanca o Retiro."
										/>
										<BenefitCard
											title="Diseño Responsive"
											desc="Tu web se verá perfecta en teléfonos, tablets y ordenadores. Donde están tus clientes."
										/>
										<BenefitCard
											title="SEO Local Madrid"
											desc="Aparece cuando alguien busca 'servicios en Madrid'. No pierdas clientes cerca de ti."
										/>
									</div>
								</div>
							</section>

							{/* Problemas que resolvemos (Existing Section Integrated) */}
							<section className="bg-dark-900/50 p-8 rounded-3xl border border-dark-800">
								<h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
									<Zap className="text-accent-500" />
									¿Qué incluye un desarrollo web profesional?
								</h2>
								<div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
									<FeatureListItem text="Arquitectura web escalable y modular" />
									<FeatureListItem text="Diseño web responsive para negocios" />
									<FeatureListItem text="Optimización técnica (Performance)" />
									<FeatureListItem text="SEO On-Page para Google" />
									<FeatureListItem text="Tienda online para pymes (eCommerce)" />
									<FeatureListItem text="Código limpio y optimizado con IA" />
									<FeatureListItem text="Automatización de recepción de consultas" />
									<FeatureListItem text="Velocidad de carga relámpago" />
								</div>
							</section>

							{/* Sección Precios */}
							<section>
								<h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
									<ShieldCheck className="text-green-500" />
									Precios orientativos en Madrid para pymes y autónomos
								</h2>
								<p className="text-dark-400 mb-8 italic text-sm">
									*Nota: Estos precios son una base y varían según las funcionalidades específicas de cada proyecto de <strong>páginas web para autónomos Madrid</strong>.
								</p>
								<div className="grid md:grid-cols-3 gap-6">
									<PriceCard
										level="Landing Pages"
										price="Desde 500€"
										bestFor="Campañas específicas y captación de leads"
									/>
									<PriceCard
										level="Web Corporativa"
										price="Desde 1.200€"
										bestFor="Pequeñas y medianas empresas con imagen de marca"
									/>
									<PriceCard
										level="Tienda Online (eCommerce)"
										price="Desde 2.500€"
										bestFor="Pymes que quieren vender sus productos 24/7"
									/>
								</div>
							</section>

							{/* Sección Proveedor */}
							<section>
								<h2 className="text-3xl font-bold text-white mb-6">Cómo elegir un proveedor de desarrollo web en Madrid</h2>
								<div className="prose prose-invert max-w-none text-dark-400">
									<p>
										Para un <strong>diseño web Madrid pymes</strong> exitoso debes fijarte en la transparencia, el portfolio real y el enfoque en ventas, no solo estética. La proximidad en barrios como Chamberí o Arganzuela permite una mejor comunicación.
									</p>
								</div>
							</section>

							{/* Sección Casos de Éxito */}
							<section className="border-t border-dark-800 pt-16">
								<h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
									<CheckCircle className="text-green-500" />
									Casos de éxito y testimonios locales en Madrid
								</h2>
								<div className="grid sm:grid-cols-2 gap-8">
									<TestimonialCard
										name="Cafetería El Barrio"
										location="Chamberí"
										text="ZeroCode entendió perfectamente lo que necesitábamos. Nuestra web ahora carga al instante y hemos notado un aumento del 30% en reservas locales."
									/>
									<TestimonialCard
										name="Consultoría Madrid"
										location="Retiro"
										text="La web corporativa que diseñaron ha elevado nuestra imagen profesional. El trato directo en Madrid facilita mucho las cosas."
									/>
								</div>
							</section>

							{/* FAQ Section */}
							<section>
								<h2 className="text-3xl font-bold text-white mb-8 text-center sm:text-left">Preguntas frecuentes (FAQ)</h2>
								<div className="space-y-6">
									<FaqItem
										q="¿Cuánto tarda en estar lista?"
										a="Una creación de página web autónomos Madrid suele tardar entre 2 y 4 semanas, dependiendo del contenido."
									/>
									<FaqItem
										q="¿Tengo que saber de informática para gestionar mi web?"
										a="Para nada. Te entregamos la web lista y te damos una formación básica para que seas autónomo al 100%."
									/>
									<FaqItem
										q="¿La web será mía al 100%?"
										a="Sí. Siempre recomendamos que el dominio y el hosting estén a tu nombre. Tú eres el dueño legal de todo."
									/>
									<FaqItem
										q="¿Por qué necesito una web si ya tengo redes sociales?"
										a="Porque tu web es tuya. Las redes son prestadas. Un desarrollo de tiendas online para pymes te da control total."
									/>
								</div>
							</section>
						</div>

						{/* Sidebar / Stats & Advice */}
						<aside className="space-y-8 sticky top-32">
							<div className="bg-gradient-to-br from-primary-600 to-accent-600 p-8 rounded-3xl text-white shadow-glow">
								<h3 className="text-2xl font-bold mb-4">Estadísticas Clave</h3>
								<div className="space-y-6">
									<div>
										<span className="text-4xl font-bold">88%</span>
										<p className="text-sm opacity-90">de consumidores investigan online antes de comprar localmente.</p>
									</div>
									<div>
										<span className="text-4xl font-bold">53%</span>
										<p className="text-sm opacity-90">abandona una web que tarda más de 3 segundos en cargar.</p>
									</div>
								</div>
							</div>

							<div className="bg-dark-900 border border-dark-800 p-6 rounded-3xl">
								<h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
									<Search className="w-5 h-5 text-primary-400" />
									Consejo SEO Técnico
								</h3>
								<p className="text-dark-400 text-sm leading-relaxed">
									Optimiza tus "Core Web Vitals". Un buen <strong>servicios de diseño web</strong> garantiza que Google favorezca tu sitio.
								</p>
							</div>

							<div className="bg-dark-900 border border-dark-800 p-6 rounded-3xl">
								<h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
									<MapPin className="w-5 h-5 text-accent-400" />
									Presencia en Madrid
								</h3>
								<p className="text-dark-400 text-sm">
									Damos servicio en: Centro, Salamanca, Chamberí, Retiro, Tetuán, Moncloa, Arganzuela y más.
								</p>
							</div>
						</aside>
					</div>


				</div>
			</div>
		</Layout>
	);
}

function BenefitCard({ title, desc }: { title: string, desc: string }) {
	return (
		<div className="p-5 rounded-2xl bg-dark-900 border border-dark-800 hover:border-primary-500/50 transition-all">
			<h4 className="font-bold text-white mb-2">{title}</h4>
			<p className="text-sm text-dark-400">{desc}</p>
		</div>
	);
}

function FeatureListItem({ text }: { text: string }) {
	return (
		<li className="flex items-center gap-2 text-dark-300">
			<CheckCircle className="w-5 h-5 text-primary-500 shrink-0" />
			<span>{text}</span>
		</li>
	);
}

function PriceCard({ level, price, bestFor }: { level: string, price: string, bestFor: string }) {
	return (
		<div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
			<span className="text-xs text-primary-400 font-bold uppercase tracking-wider">{level}</span>
			<div className="text-3xl font-bold text-white my-2">{price}</div>
			<p className="text-sm text-dark-400">{bestFor}</p>
		</div>
	);
}

function FaqItem({ q, a }: { q: string, a: string }) {
	return (
		<div className="p-6 rounded-2xl bg-dark-900 border border-dark-800">
			<h4 className="text-lg font-bold text-white mb-2">{q}</h4>
			<p className="text-dark-400 leading-relaxed text-sm">{a}</p>
		</div>
	);
}

function TestimonialCard({ name, location, text }: { name: string, location: string, text: string }) {
	return (
		<div className="bg-dark-900/40 p-6 rounded-2xl border border-dark-800 relative">
			<div className="absolute top-4 right-6 text-primary-500/20 text-6xl font-serif">"</div>
			<p className="text-dark-300 italic mb-6 relative z-10">{text}</p>
			<div>
				<div className="font-bold text-white">{name}</div>
				<div className="text-xs text-dark-500 flex items-center gap-1">
					<MapPin className="w-3 h-3" /> {location}, Madrid
				</div>
			</div>
		</div>
	);
}
