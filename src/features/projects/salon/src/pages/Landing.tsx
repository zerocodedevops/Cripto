// Blog Images
import blogBalayage from "@salon/assets/blog/blog-balayage.png";
import blogHaircut from "@salon/assets/blog/blog-haircut-myth.png";
import blogTreatment from "@salon/assets/blog/blog-treatment.png";
import blogVisagism from "@salon/assets/blog/blog-visagism.png";
import blogWash from "@salon/assets/blog/blog-wash.png";
import galleryLook1 from "@salon/assets/gallery/gallery-look-1.webp";
import galleryLook2 from "@salon/assets/gallery/gallery-look-2.webp";
import galleryLook3 from "@salon/assets/gallery/gallery-look-3.webp";
import galleryLook4 from "@salon/assets/gallery/gallery-look-4.webp";
import logoHero from "@salon/assets/logo-zerovanity-hero.webp";
import logoNavbar from "@salon/assets/logo-zerovanity-navbar.webp";
import serviceAlisado from "@salon/assets/services/service-alisado.webp";
import serviceAsesoria from "@salon/assets/services/service-asesoria.webp";
import serviceBalayage from "@salon/assets/services/service-balayage.webp";
import serviceColor from "@salon/assets/services/service-color.webp";
import serviceDepilacion from "@salon/assets/services/service-depilacion.webp";
import serviceExtensions from "@salon/assets/services/service-extensions.webp";
import serviceHaircut from "@salon/assets/services/service-haircut.webp";
import serviceKeratin from "@salon/assets/services/service-keratin.webp";
import serviceManicura from "@salon/assets/services/service-manicura.webp";
import serviceMaquillaje from "@salon/assets/services/service-maquillaje.webp";
import servicePedicura from "@salon/assets/services/service-pedicura.webp";
import servicePostizo from "@salon/assets/services/service-postizo.webp";
import serviceRastas from "@salon/assets/services/service-rastas.webp";
import serviceTreatment from "@salon/assets/services/service-treatment.webp";
import serviceTrenzas from "@salon/assets/services/service-trenzas.webp";
import teamImage from "@salon/assets/team-zerovanity.webp";
import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowRight,
	Calendar,
	Clock,
	Scissors,
	Sparkles,
	Star,
	User,
	X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { BookingModal } from "../components/BookingModal";

export default function Landing() {
	const [selectedPost, setSelectedPost] = useState<
		(typeof BLOG_POSTS)[0] | null
	>(null);
	const [isBookingOpen, setIsBookingOpen] = useState(false);

	return (
		<div className="min-h-screen bg-background text-[#FCF6BA] font-body selection:bg-[#BF953F] selection:text-black">
			{/* Background Effects */}
			<div className="fixed inset-0 z-0 pointer-events-none">
				<div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#BF953F]/10 to-transparent opacity-50" />
				<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
			</div>

			{/* Navbar */}
			<nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
				<div className="flex items-center gap-2">
					<img
						src={logoNavbar}
						alt="Zero Vanity Logo"
						className="h-12 w-auto object-contain"
					/>
				</div>

				{/* Desktop Navigation */}
				<ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
					{[
						"Inicio",
						"Nosotros",
						"Servicios",
						"Galería",
						"Blog",
						"FAQs",
						"Contacto",
					].map((item) => {
						let targetId = item
							.toLowerCase()
							.replace("á", "a")
							.replace(" ", "-");
						if (item === "Inicio") {
							targetId = "top";
						} else if (item === "Nosotros") {
							targetId = "sobre-nosotros";
						}

						return (
							<li key={item}>
								<button
									onClick={() => {
										if (item === "Inicio") {
											window.scrollTo({ top: 0, behavior: "smooth" });
										} else {
											document
												.getElementById(targetId)
												?.scrollIntoView({ behavior: "smooth" });
										}
									}}
									className="text-sm uppercase tracking-widest text-[#FCF6BA] hover:text-[#BF953F] transition-colors font-body font-medium bg-transparent border-none cursor-pointer"
								>
									{item}
								</button>
							</li>
						);
					})}
				</ul>

				<div>
					<Link
						to="/proyectos/salon/auth/admin/login"
						className="px-6 py-2 border border-[#BF953F] text-[#BF953F] hover:bg-[#BF953F] hover:text-black transition-all duration-300 uppercase text-xs font-bold tracking-widest rounded-sm"
					>
						Acceso Admin
					</Link>
				</div>
			</nav>

			{/* Hero Section */}
			<main className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-16 md:mt-24 flex flex-col items-center text-center">
				<div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
					<Sparkles size={14} className="text-[#BF953F]" />
					<span className="text-xs uppercase tracking-widest text-neutral-400">
						Peluquería • Estética
					</span>
				</div>

				<div className="w-full max-w-3xl mb-12 animate-in fade-in zoom-in-95 duration-1000 delay-100 p-4">
					<img
						src={logoHero}
						alt="Zero Vanity"
						className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(191,149,63,0.3)]"
					/>
				</div>

				<p className="max-w-2xl text-lg text-neutral-400 mb-12 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
					Bienvenido a Zero Vanity, donde la estética de vanguardia se une al
					lujo atemporal. Descubre un espacio dedicado exclusivamente a tu
					imagen y bienestar, con tratamientos personalizados y un equipo de
					élite.
				</p>

				<div className="flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
					<button
						onClick={() => setIsBookingOpen(true)}
						className="group relative px-8 py-4 bg-[#BF953F] text-black font-bold uppercase tracking-widest overflow-hidden rounded-sm hover:scale-105 transition-transform duration-300 cursor-pointer"
					>
						<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
						<span className="relative flex items-center gap-3">
							RESERVAR CITA <Calendar size={18} />
						</span>
					</button>
				</div>

				{/* About Section */}
				<section id="sobre-nosotros" className="w-full mt-32 scroll-mt-32">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
						<div className="aspect-square bg-neutral-900 border border-white/5 rounded-sm p-4 rotate-3">
							<img
								src={teamImage}
								alt="Equipo Zero Vanity"
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="text-left">
							<h2 className="font-heading text-4xl text-[#FCF6BA] mb-6">
								Sobre Nosotros
							</h2>
							<p className="text-neutral-400 leading-relaxed mb-6">
								En Zero Vanity, fusionamos la tradición de la alta peluquería
								con las técnicas estéticas más vanguardistas. Nuestro equipo de
								estilistas expertos está dedicado a esculpir tu mejor versión en
								un ambiente de lujo y relajación.
							</p>
							<p className="text-neutral-400 leading-relaxed">
								Cada visita es un ritual de belleza personalizado, donde tu
								satisfacción es nuestra única prioridad.
							</p>
						</div>
					</div>
				</section>

				{/* Features Grid (Servicios destacados) */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full text-left">
					<FeatureCard
						icon={<Scissors className="text-[#BF953F]" />}
						title="Estilismo de Vanguardia"
						desc="Nuestros directores creativos diseñarán el corte y color perfecto que realce tus facciones y personalidad única."
						delay={400}
					/>
					<FeatureCard
						icon={<Sparkles className="text-[#BF953F]" />}
						title="Rituales de Bienestar"
						desc="Sumérgete en una experiencia sensorial con productos orgánicos de primera línea y técnicas de relajación profunda."
						delay={500}
					/>
					<FeatureCard
						icon={<Star className="text-[#BF953F]" />}
						title="Experiencia VIP"
						desc="Disfruta de un ambiente privado y sofisticado, donde cada detalle está pensado para tu máxima satisfacción."
						delay={600}
					/>
				</div>

				{/* Services Section */}
				<section id="servicios" className="w-full mt-40 scroll-mt-32">
					<div className="flex flex-col items-center mb-16 px-4">
						<h2 className="font-heading text-4xl md:text-5xl text-[#FCF6BA] mb-6 text-center">
							Nuestros Servicios
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#BF953F] to-transparent" />
						<p className="mt-6 text-neutral-400 max-w-2xl text-center font-light">
							Descubre nuestra carta de tratamientos exclusivos, diseñados para
							realzar tu belleza natural con productos de primera línea.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
						{SERVICES.map((service, index) => (
							<ServiceCard
								key={service.title}
								{...service}
								delay={index * 100}
							/>
						))}
					</div>
				</section>

				{/* Gallery Section */}
				<section id="galería" className="w-full mt-40 scroll-mt-32">
					<h2 className="font-heading text-4xl text-[#FCF6BA] mb-12 text-center">
						Galería
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="aspect-square bg-neutral-900 border border-white/5 hover:border-[#BF953F]/50 transition-colors">
							<img
								src={galleryLook1}
								alt="Novia Romántica"
								className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
							/>
						</div>
						<div className="aspect-square bg-neutral-900 border border-white/5 hover:border-[#BF953F]/50 transition-colors">
							<img
								src={galleryLook2}
								alt="Look Editorial"
								className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
							/>
						</div>
						<div className="aspect-square bg-neutral-900 border border-white/5 hover:border-[#BF953F]/50 transition-colors">
							<img
								src={galleryLook3}
								alt="Look Casual Waves"
								className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
							/>
						</div>
						<div className="aspect-square bg-neutral-900 border border-white/5 hover:border-[#BF953F]/50 transition-colors">
							<img
								src={galleryLook4}
								alt="Look Casual Bob"
								className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
							/>
						</div>
					</div>
				</section>

				{/* Blog Section */}
				<section id="blog" className="w-full mt-40 scroll-mt-32">
					<h2 className="font-heading text-4xl text-[#FCF6BA] mb-12 text-center">
						Últimas Novedades
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{BLOG_POSTS.map((post, index) => (
							<button
								key={post.id}
								className="group w-full text-left cursor-pointer border border-white/5 bg-background hover:bg-white/[0.02] transition-colors overflow-hidden flex flex-col h-full"
								onClick={() => setSelectedPost(post)}
							>
								<div className="aspect-video w-full overflow-hidden">
									<img
										src={post.image}
										alt={post.title}
										className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
									/>
								</div>
								<div className="p-6 flex-1 flex flex-col">
									<div className="flex items-center gap-4 mb-3">
										<span className="text-[#BF953F] text-xs uppercase tracking-widest font-bold">
											{post.category}
										</span>
										<span className="text-neutral-600 text-xs flex items-center gap-1">
											• <Clock size={10} /> {post.readTime}
										</span>
									</div>
									<h3 className="font-heading text-xl text-[#FCF6BA] mb-3 group-hover:text-white transition-colors line-clamp-2 leading-tight">
										{post.title}
									</h3>
									<p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1 font-light">
										{post.excerpt}
									</p>
									<div className="flex items-center text-[#BF953F] text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
										Leer Artículo <ArrowRight size={12} className="ml-2" />
									</div>
								</div>
							</button>
						))}
					</div>
				</section>

				{/* FAQ Section */}
				<section
					id="faqs"
					className="w-full mt-40 scroll-mt-32 max-w-3xl mx-auto"
				>
					<h2 className="font-heading text-4xl text-[#FCF6BA] mb-12 text-center">
						Preguntas Frecuentes
					</h2>
					<div className="space-y-4">
						<div className="border border-white/5 p-6 bg-white/[0.02]">
							<h3 className="text-[#FCF6BA] font-heading text-lg mb-2">
								¿Necesito cita previa?
							</h3>
							<p className="text-neutral-400">
								Sí, recomendamos reservar para garantizar la mejor atención.
							</p>
						</div>
						<div className="border border-white/5 p-6 bg-white/[0.02]">
							<h3 className="text-[#FCF6BA] font-heading text-lg mb-2">
								¿Qué marcas utilizáis?
							</h3>
							<p className="text-neutral-400">
								Trabajamos exclusivamente con productos de gama alta y
								orgánicos.
							</p>
						</div>
					</div>
				</section>

				{/* Contact Section */}
				<section id="contacto" className="w-full mt-40 scroll-mt-32 mb-32">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/[0.02] border border-white/5 p-8 md:p-12">
						<div>
							<h2 className="font-heading text-4xl text-[#FCF6BA] mb-6">
								Contacto
							</h2>
							<p className="text-neutral-400 mb-8">
								Estamos aquí para asesorarte. Visítanos o contáctanos.
							</p>

							<div className="space-y-6">
								<div className="flex items-center gap-4">
									<div className="w-10 h-10 border border-[#BF953F] flex items-center justify-center">
										<div className="w-10 h-10 border border-[#BF953F] flex items-center justify-center">
											<Calendar size={18} className="text-[#BF953F]" />
										</div>
									</div>
									<div>
										<p className="text-xs uppercase tracking-widest text-[#BF953F]">
											Horario
										</p>
										<p className="text-white">Lun - Sab: 10:00 - 20:00</p>
									</div>
								</div>
								{/* Add more contact info here */}
							</div>
						</div>
						<div className="bg-neutral-900 border border-white/10 h-64 md:h-auto flex items-center justify-center">
							<span className="text-neutral-500 uppercase tracking-widest text-sm">
								[Mapa Ubicación]
							</span>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="relative z-10 w-full border-t border-white/5 mt-32 py-8 text-center">
				<p className="text-neutral-600 text-xs uppercase tracking-widest">
					© 2026 Zero Salon. The Art of Coding.
				</p>
			</footer>

			{/* Render Blog Modal if selected */}
			<AnimatePresence>
				{selectedPost && (
					<BlogModal
						post={selectedPost}
						onClose={() => setSelectedPost(null)}
					/>
				)}
				{isBookingOpen && (
					<BookingModal onClose={() => setIsBookingOpen(false)} />
				)}
			</AnimatePresence>
		</div>
	);
}

function FeatureCard({
	icon,
	title,
	desc,
	delay,
}: Readonly<{ icon: any; title: string; desc: string; delay: number }>) {
	return (
		<div
			className={`p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-backwards`}
			style={{ animationDelay: `${delay}ms` }}
		>
			<div className="mb-4">{icon}</div>
			<h3 className="font-heading text-xl text-[#FCF6BA] mb-2">{title}</h3>
			<p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
		</div>
	);
}

function ServiceCard({
	title,
	desc,
	image,
	delay,
}: Readonly<{ title: string; desc: string; image: string; delay: number }>) {
	return (
		<div
			className="group relative overflow-hidden rounded-sm border border-[#BF953F]/40 bg-background hover:border-[#BF953F] hover:shadow-[0_0_20px_rgba(191,149,63,0.2)] hover:scale-[1.02] transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
			style={{ animationDelay: `${delay}ms` }}
		>
			<div className="aspect-[4/3] w-full overflow-hidden">
				<img
					src={image}
					alt={title}
					className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
				/>
			</div>
			<div className="p-6 relative">
				<div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#BF953F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
				<h3 className="font-heading text-xl text-[#FCF6BA] mb-3 group-hover:text-[#BF953F] transition-colors">
					{title}
				</h3>
				<p className="text-neutral-400 text-sm leading-relaxed font-light">
					{desc}
				</p>
			</div>
		</div>
	);
}

function BlogModal({
	post,
	onClose,
}: Readonly<{ post: (typeof BLOG_POSTS)[0]; onClose: () => void }>) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
			onClick={onClose}
		>
			<motion.div
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 50, opacity: 0 }}
				transition={{ type: "spring", damping: 25, stiffness: 200 }}
				className="bg-[#121212] w-full max-w-4xl max-h-full md:max-h-[90vh] overflow-y-auto rounded-sm border border-white/10 shadow-2xl relative flex flex-col"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header Image */}
				<div className="relative w-full h-64 md:h-96 shrink-0">
					<img
						src={post.image}
						alt={post.title}
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-90" />

					<button
						onClick={onClose}
						className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-[#BF953F] text-white rounded-full transition-colors z-20"
					>
						<X size={20} />
					</button>

					<div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
						<span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black bg-[#BF953F]">
							{post.category}
						</span>
						<h2 className="font-heading text-3xl md:text-5xl text-[#FCF6BA] mb-4 leading-tight max-w-3xl">
							{post.title}
						</h2>
						<div className="flex items-center gap-6 text-sm text-neutral-400 font-light">
							<span className="flex items-center gap-2">
								<User size={14} /> Equipo Estilistas
							</span>
							<span className="flex items-center gap-2">
								<Clock size={14} /> {post.readTime} de lectura
							</span>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="p-8 md:p-16 flex justify-center">
					<div className="prose prose-invert prose-lg max-w-2xl font-light text-neutral-300 leading-relaxed">
						<div className="first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:mt-[-5px] first-letter:font-heading first-letter:text-[#BF953F]">
							{post.content}
						</div>
					</div>
				</div>

				{/* Footer CTA */}
				<div className="border-t border-white/5 p-8 text-center bg-white/[0.02]">
					<p className="text-[#FCF6BA] font-heading text-xl mb-4">
						¿Te gustaría probar este servicio?
					</p>
					<Link
						to="auth/login"
						className="inline-block px-8 py-3 border border-[#BF953F] text-[#BF953F] hover:bg-[#BF953F] hover:text-black transition-colors uppercase text-xs font-bold tracking-widest"
					>
						Reservar Cita Ahora
					</Link>
				</div>
			</motion.div>
		</motion.div>
	);
}

const BLOG_POSTS = [
	{
		id: 1,
		title:
			"Balayage, Babylights o Melting: La guía definitiva para saber qué rubio pedirle a tu estilista",
		category: "Color & Tendencias",
		readTime: "4 min",
		image: blogBalayage,
		excerpt:
			"¿Confundida con la terminología? No eres la única. Muchos clientes no saben la diferencia técnica entre estos servicios. Esta guía promete claridad y te ayuda a tomar una decisión informada antes de tu cita.",
		content: (
			<>
				<p>
					En el mundo de la peluquería, los términos técnicos pueden resultar
					abrumadores. ¿Buscas un degradado sutil o un contraste marcado? La
					diferencia entre un resultado espectacular y uno decepcionante suele
					estar en la comunicación.
				</p>
				<h3 className="text-[#FCF6BA] font-heading mt-8 mb-4">
					Balayage: El arte de la "mano alzada"
				</h3>
				<p>
					El <strong>Balayage</strong> no es un look específico, sino una
					técnica francesa que significa "barrer". El colorista pinta el
					aclarado a mano alzada directamente sobre el cabello, creando un
					efecto degradado natural, como si el sol hubiera aclarado tus puntas.
					Es perfecto si buscas un mantenimiento bajo y un crecimiento sin
					líneas marcadas.
				</p>
				<h3 className="text-[#FCF6BA] font-heading mt-8 mb-4">
					Babylights: Sutileza extrema
				</h3>
				<p>
					Las <strong>Babylights</strong> son micro-mechas tejidas muy finas,
					diseñadas para imitar los reflejos naturales que tienen los niños en
					el cabello. Aportan una luminosidad global y vibrante desde la raíz,
					ideal para rubios nórdicos o para iluminar bases castañas sin cambiar
					drásticamente el tono.
				</p>
				<h3 className="text-[#FCF6BA] font-heading mt-8 mb-4">
					Color Melting: La fusión perfecta
				</h3>
				<p>
					Si odias el "efecto raíz", el <strong>Color Melting</strong> es para
					ti. Esta técnica funde el color base con las mechas utilizando uno o
					varios tonos intermedios, eliminando cualquier línea de demarcación
					visible. El resultado es un flujo de color orgánico y lujoso.
				</p>
				<div className="bg-[#BF953F]/10 border-l-2 border-[#BF953F] p-6 my-8 italic text-neutral-200">
					"La clave está en no pedir una técnica, sino mostrar el resultado que
					deseas. Trae fotos y déjanos asesorarte sobre qué técnica (o
					combinación) es la ideal para tu tipo de cabello."
				</div>
			</>
		),
	},
	{
		id: 2,
		title:
			"¿Cortar las puntas realmente hace que el pelo crezca más rápido? 5 Mitos de peluquería desmentidos",
		category: "Mitos & Realidades",
		readTime: "3 min",
		image: blogHaircut,
		excerpt:
			"Hay mucha desinformación sobre el cuidado capilar. Los mitos generan curiosidad inmediata, pero aquí nos posicionamos como los expertos para revelarte la verdad sobre el crecimiento y salud de tu cabello.",
		content: (
			<>
				<p>
					Todos hemos escuchado consejos de abuelas o trucos de internet que
					prometen melenas de Rapunzel en una semana. Es hora de separar la
					ciencia de la ficción.
				</p>
				<ul className="list-none space-y-6 mt-6">
					<li>
						<strong className="text-[#FCF6BA] block mb-1">
							Mito 1: Cortar las puntas acelera el crecimiento.
						</strong>
						<span className="block pl-4 border-l border-neutral-700">
							<strong>Falso.</strong> El cabello crece desde la raíz (folículo),
							no desde las puntas. Cortarlo no envía ninguna señal mágica a la
							raíz. Sin embargo, sanear las puntas evita que se abran (orzuela)
							y se rompan hacia arriba, lo que hace que tu melena{" "}
							<em>parezca</em> más larga y densa porque no pierde longitud por
							rotura.
						</span>
					</li>
					<li>
						<strong className="text-[#FCF6BA] block mb-1">
							Mito 2: Arrancarse una cana hace que salgan siete.
						</strong>
						<span className="block pl-4 border-l border-neutral-700">
							<strong>Falso.</strong> Cada cabello tiene su propio folículo.
							Arrancar uno no afecta a los de alrededor. Pero cuidado: puedes
							dañar el folículo permanentemente y que deje de crecer pelo ahí.
						</span>
					</li>
					<li>
						<strong className="text-[#FCF6BA] block mb-1">
							Mito 3: Lavarse el pelo todos los días es malo.
						</strong>
						<span className="block pl-4 border-l border-neutral-700">
							<strong>Depende.</strong> No es intrínsecamente malo si usas el
							champú adecuado. La higiene del cuero cabelludo es vital. Si
							tienes grasa, debes lavarlo; si es seco, espacia los lavados.
						</span>
					</li>
				</ul>
			</>
		),
	},
	{
		id: 3,
		title:
			"SOS Cabello Dañado: La rutina de 3 pasos para recuperar el brillo después del verano",
		category: "Cuidado & Salud",
		readTime: "5 min",
		image: blogTreatment,
		excerpt:
			"¿Tu pelo pide auxilio? Este artículo ataca un punto de dolor muy específico. Te ofrecemos una solución práctica y sencilla para devolver la vida a tu melena tras los estragos del sol o decoloraciones.",
		content: (
			<>
				<p>
					El sol, el cloro, la sal y las herramientas de calor son los jinetes
					del apocalipsis capilar. Si tu cabello se siente como paja, se enreda
					con mirarlo y ha perdido su brillo espejo, no necesitas cortarlo todo
					(todavía).
				</p>
				<h3 className="text-[#FCF6BA] font-heading mt-8 mb-4">
					Paso 1: Detox y Limpieza Profunda
				</h3>
				<p>
					Antes de nutrir, hay que limpiar. Los residuos de siliconas y
					minerales impiden que los tratamientos penetren. Utiliza un champú
					clarificante suave o realiza un <strong>peeling capilar</strong> en el
					salón para oxigenar el cuero cabelludo y preparar la fibra.
				</p>
				<h3 className="text-[#FCF6BA] font-heading mt-8 mb-4">
					Paso 2: Reconstrucción de Enlaces (Bond Builder)
				</h3>
				<p>
					La hidratación (agua) no es suficiente si la estructura interna está
					rota. Necesitas proteínas y multiplicadores de enlaces (tipo Olaplex o
					K18). Estos tratamientos reparan los puentes disulfuro rotos,
					devolviendo la fuerza y elasticidad.
				</p>
				<h3 className="text-[#FCF6BA] font-heading mt-8 mb-4">
					Paso 3: Sellado de Cutícula (Acidificación)
				</h3>
				<p>
					El paso olvidado. Un cabello dañado tiene la cutícula abierta (perdida
					de brillo). Finaliza siempre con un acondicionador o mascarilla de pH
					ácido para sellar la fibra y atrapar los nutrientes. Y por favor, ¡usa
					siempre protector térmico!
				</p>
			</>
		),
	},
	{
		id: 4,
		title:
			"Dime qué forma tiene tu rostro y te diré qué corte te favorece (Guía de Visagismo)",
		category: "Estilo & Visagismo",
		readTime: "6 min",
		image: blogVisagism,
		excerpt:
			"La personalización es la clave del lujo. No se trata de qué corte está de moda, sino de qué corte armoniza contigo. Esta guía de visagismo es contenido esencial para encontrar tu estilo ideal.",
		content: (
			<>
				<p>
					¿Alguna vez has llevado una foto de una celebridad a la peluquería y
					el resultado no te gustó? No fue culpa del peluquero, probablemente
					fue la geometría. El visagismo es el estudio de las proporciones del
					rostro para potenciar tus rasgos.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
					<div className="bg-white/[0.03] p-6 border border-white/5">
						<h4 className="text-[#BF953F] font-bold mb-2">Rostro Redondo</h4>
						<p className="text-sm">
							Busca verticalidad. Cortes a capas largas, flequillos ladeados y
							volumen en la coronilla (tipo Pixie con tupé) alargan visualmente
							las facciones. Evita el Bob a la altura de la mandíbula.
						</p>
					</div>
					<div className="bg-white/[0.03] p-6 border border-white/5">
						<h4 className="text-[#BF953F] font-bold mb-2">Rostro Cuadrado</h4>
						<p className="text-sm">
							El objetivo es suavizar ángulos. Ondas suaves, capas desfiladas
							alrededor de la cara y el corte "Shag" funcionan de maravilla.
							Evita flequillos rectos y cortes geométricos duros.
						</p>
					</div>
					<div className="bg-white/[0.03] p-6 border border-white/5">
						<h4 className="text-[#BF953F] font-bold mb-2">Rostro Alargado</h4>
						<p className="text-sm">
							Necesitas volumen lateral. Un Bob ondulado, flequillos rectos o
							cortina acortan el rostro. Evita el pelo muy largo y liso sin
							forma.
						</p>
					</div>
					<div className="bg-white/[0.03] p-6 border border-white/5">
						<h4 className="text-[#BF953F] font-bold mb-2">Rostro Ovalado</h4>
						<p className="text-sm">
							¡El comodín! Tienes la "proporción áurea". Casi todo te queda
							bien. Atrévete con cortes radicales o tendencias arriesgadas, tu
							estructura ósea lo soporta todo.
						</p>
					</div>
				</div>
			</>
		),
	},
	{
		id: 5,
		title:
			"Lo que tu peluquero ve (y tú no) cuando te lavas el pelo en casa: Errores comunes",
		category: "Tips Profesionales",
		readTime: "4 min",
		image: blogWash,
		excerpt:
			"Crea un sentido de urgencia y curiosidad ('¿Lo estaré haciendo mal?'). Te explicamos los errores invisibles que apagan tu color y cómo corregirlos para mantener el resultado de salón en casa.",
		content: (
			<>
				<p>
					Inviertes en el mejor color y corte, pero tu rutina de ducha puede
					estar saboteándolo todo. Como profesionales, a menudo vemos signos de
					"malos hábitos" de lavado que apagan el brillo y deshidratan la fibra.
				</p>
				<h3 className="text-[#FCF6BA] font-heading mt-8 mb-4">
					Error 1: Frotar las puntas como si fuera ropa
				</h3>
				<p>
					El champú es para el cuero cabelludo, donde está la grasa. La espuma
					que cae es suficiente para limpiar los largos. Frotar las puntas
					agresivamente abre la cutícula y provoca enredos y rotura. Masejea
					solo la raíz.
				</p>
				<h3 className="text-[#FCF6BA] font-heading mt-8 mb-4">
					Error 2: Agua volcánica
				</h3>
				<p>
					Sabemos que relaja, pero el agua muy caliente disuelve los lípidos
					naturales y arrastra el tinte mucho más rápido. Intenta lavar con agua
					tibia y haz el último aclarado con agua fría para sellar el brillo.
				</p>
				<h3 className="text-[#FCF6BA] font-heading mt-8 mb-4">
					Error 3: Acondicionador en la raíz
				</h3>
				<p>
					A menos que tengas el cuero cabelludo extremadamente seco, el
					acondicionador va de medios a puntas. Aplicarlo arriba resta volumen y
					ensucia el pelo más rápido.
				</p>
				<div className="mt-8">
					<p className="font-bold text-[#BF953F] mb-2">
						Nuestra recomendación:
					</p>
					<p>
						Utiliza nuestra línea orgánica de mantenimiento en casa, libre de
						sulfatos agresivos, para prolongar la vida de tu color.
					</p>
				</div>
			</>
		),
	},
];

const SERVICES = [
	{
		title: "Corte de Pelo",
		desc: "Estudio visajístico y corte personalizado adaptado a tus facciones.",
		image: serviceHaircut,
	},
	{
		title: "Tinte Premium",
		desc: "Coloración de alta gama que aporta brillo, cobertura y nutrición profunda.",
		image: serviceColor,
	},
	{
		title: "Mechas Balayage",
		desc: "Técnica a mano alzada para un degradado natural y luminoso efecto 'sun-kissed'.",
		image: serviceBalayage,
	},
	{
		title: "Tratamiento Capilar",
		desc: "Rituales de hidratación y reconstrucción para recuperar la salud de tu fibra capilar.",
		image: serviceTreatment,
	},
	{
		title: "Keratina",
		desc: "Alisado y eliminación del encrespamiento para un cabello manejable y sedoso.",
		image: serviceKeratin,
	},
	{
		title: "Extensiones",
		desc: "Volumen y longitud con sistemas de integración natural de máxima calidad.",
		image: serviceExtensions,
	},
	{
		title: "Pelo Postizo",
		desc: "Soluciones estéticas personalizadas para necesidades específicas de densidad.",
		image: servicePostizo,
	},
	{
		title: "Rastas",
		desc: "Creación y mantenimiento de rastas con técnicas que cuidan tu raíz.",
		image: serviceRastas,
	},
	{
		title: "Alisado Permanente",
		desc: "Transformación de la estructura del cabello para un liso perfecto y duradero.",
		image: serviceAlisado,
	},
	{
		title: "Trenzas",
		desc: "Diseños trenzados artísticos, desde estilos clásicos hasta vanguardistas.",
		image: serviceTrenzas,
	},
	{
		title: "Asesoría de Imagen",
		desc: "Consultoría integral para encontrar el estilo que mejor proyecta tu personalidad.",
		image: serviceAsesoria,
	},
	{
		title: "Maquillaje Profesional",
		desc: "Para eventos, novias o social. Resaltamos tu belleza con productos HD.",
		image: serviceMaquillaje,
	},
	{
		title: "Manicura Spa",
		desc: "Cuidado completo de manos y uñas con esmaltados de larga duración.",
		image: serviceManicura,
	},
	{
		title: "Pedicura",
		desc: "Experiencia relajante y estética para unos pies sanos y bellos.",
		image: servicePedicura,
	},
	{
		title: "Depilación",
		desc: "Técnicas suaves y efectivas para una piel perfecta y libre de vello.",
		image: serviceDepilacion,
	},
];
