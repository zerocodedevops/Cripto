import { motion } from "framer-motion";
import { Code2, Heart, MapPin, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Seo } from "@/components/common/SEO";
import { Layout } from "@/components/layout";

export default function FreelanceMadrid() {
	const navigate = useNavigate();
	return (
		<Layout>
			<Seo
				title="Diseñador Web Freelance en Madrid (Rivas)"
				description="Programador web freelance en Madrid con enfoque AI-First. Ayudo a pymes y autónomos a automatizar su negocio con webs de alto impacto. ¡Contáctame!"
				keywords="programador web madrid, diseñador web freelance, desarrollo web rivas vaciamadrid, david g freelance"
			/>

			<div className="pt-32 pb-20">
				<div className="container-custom">
					<div className="grid lg:grid-cols-5 gap-12 items-start">
						{/* Left Column - Profile info */}
						<div className="lg:col-span-2 space-y-8">
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								className="aspect-square rounded-3xl overflow-hidden border-2 border-primary-500/30 shadow-glow"
							>
								{/* Placeholder for Profile Image */}
								<div className="w-full h-full bg-dark-800 flex items-center justify-center">
									<Code2 className="w-20 h-20 text-primary-500 opacity-20" />
								</div>
							</motion.div>

							<div className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 space-y-4">
								<h3 className="text-xl font-bold text-white">Datos Rápidos</h3>
								<ul className="space-y-3">
									<li className="flex items-center gap-3 text-dark-400">
										<MapPin className="w-5 h-5 text-primary-500" />
										<span>Rivas-Vaciamadrid, Madrid</span>
									</li>
									<li className="flex items-center gap-3 text-dark-400">
										<Rocket className="w-5 h-5 text-primary-500" />
										<span>Especialista AI-First & NoCode</span>
									</li>
									<li className="flex items-center gap-3 text-dark-400">
										<Heart className="w-5 h-5 text-primary-500" />
										<span>Enfoque a resultados de negocio</span>
									</li>
								</ul>
							</div>
						</div>

						{/* Right Column - Text Story */}
						<div className="lg:col-span-3 space-y-10">
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
							>
								<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
									Tu compañero tecnológico: David G., experto en{" "}
									<span className="text-gradient">
										desarrollo web en Madrid
									</span>
								</h1>
								<div className="prose prose-invert max-w-none text-dark-400 space-y-6 text-lg">
									<p>
										Hola, soy David, el arquitecto detrás de ZeroCode. Tras años
										en el mundo del desarrollo técnico, decidí centrar mi
										enfoque en lo que realmente ayuda a la gente:{" "}
										<strong>
											hacer que la tecnología trabaje para las personas
										</strong>
										.
									</p>
									<p>
										Vivo y trabajo desde <strong>Rivas-Vaciamadrid</strong>, lo
										que me permite estar cerca de mis clientes en{" "}
										<strong>Madrid capital</strong> y alrededores. Creo
										firmemente que la cercanía y el trato directo son
										fundamentales para que un proyecto web para un autónomo o
										pyme sea un éxito.
									</p>
									<h2 className="text-2xl font-bold text-white pt-4">
										¿Por qué un Freelance y no una Agencia?
									</h2>
									<p>
										Trabajar con un freelance como yo significa trato directo.
										No hablas con gestores de cuentas, hablas con quien está
										pulsando las teclas. Esto se traduce en:
									</p>
									<ul className="list-disc pl-5 space-y-2">
										<li>Agilidad total en la comunicación.</li>
										<li>
											Costes más ajustados al eliminar estructuras de oficina
											innecesarias.
										</li>
										<li>Un compromiso personal absoluto con cada proyecto.</li>
									</ul>
									<h2 className="text-2xl font-bold text-white pt-4">
										Mi proceso AI-First
									</h2>
									<p>
										No me limito a "usar plantillas". Utilizo{" "}
										<strong>Inteligencia Artificial de vanguardia</strong> para
										asistir en cada fase del desarrollo: desde la generación del
										concepto visual hasta la escritura del código y la
										optimización del rendimiento. Esto no solo me permite ser
										más rápido, sino entregar una calidad técnica que
										normalmente requeriría un equipo entero. Mi objetivo es que
										tu negocio tenga una web de élite de la forma más eficiente
										posible.
									</p>
								</div>

								<div className="mt-12 flex flex-wrap gap-4">
									<button
										onClick={() => {
											navigate("/");
											setTimeout(() => {
												document
													.querySelector("#contact")
													?.scrollIntoView({ behavior: "smooth" });
											}, 100);
										}}
										className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all"
									>
										¿Hablamos de tu proyecto?
									</button>
									<button
										onClick={() => {
											navigate("/desarrollo-web-pymes-madrid");
											globalThis.scrollTo({ top: 0, behavior: "smooth" });
										}}
										className="px-8 py-4 bg-dark-800 hover:bg-dark-700 text-white font-bold rounded-xl border border-dark-700 transition-all"
									>
										Ver servicios
									</button>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
