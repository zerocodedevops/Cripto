/* eslint-disable @typescript-eslint/no-deprecated */
import { motion } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/no-deprecated
import {
	ArrowUp,
	Code2,
	Github as GithubIcon,
	Heart,
	Linkedin as LinkedinIcon,
	Mail,
	MessageCircle,
} from "lucide-react"; // NOSONAR
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const socialLinks = [
	// eslint-disable-next-line @typescript-eslint/no-deprecated
	{
		icon: GithubIcon,
		href: "https://github.com/zerocodedevops",
		label: "GitHub",
	}, // NOSONAR
	// eslint-disable-next-line @typescript-eslint/no-deprecated
	{
		icon: LinkedinIcon, // NOSONAR
		href: "https://www.linkedin.com/in/zerocode-devops",
		label: "LinkedIn",
	},
	{ icon: Mail, href: "mailto:zerocode.devops@gmail.com", label: "Email" },
	{ icon: MessageCircle, href: "https://wa.me/34912622712", label: "WhatsApp" },
];

export function Footer() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const footerLinks = [
		{ label: "Inicio", href: "/" },
		{ label: "Sobre Mí", href: "/disenador-web-freelance-madrid" },
		{ label: "Servicios", href: "/desarrollo-web-pymes-madrid" },
		{ label: "Precios", href: "/precios-paginas-web" },
		{ label: "Contacto", href: "#contact" },
	];

	const handleNavClick = (href: string) => {
		if (href.startsWith("#")) {
			const element = document.querySelector(href);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			} else {
				navigate("/");
				setTimeout(() => {
					document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
				}, 100);
			}
		} else {
			navigate(href);
			globalThis.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const scrollToTop = () => {
		globalThis.scrollTo({ top: 0, behavior: "smooth" });
	};

	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative bg-dark-900/50 border-t border-dark-700/50">
			{/* Scroll to top button */}
			<motion.button
				onClick={scrollToTop}
				className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-glow"
				whileHover={{ scale: 1.1, y: -2 }}
				whileTap={{ scale: 0.95 }}
				aria-label={t("footer.scrollButton")}
			>
				<ArrowUp className="w-5 h-5" />
			</motion.button>

			<div className="container-custom py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
					{/* Logo and tagline */}
					<div className="text-center md:text-left">
						<div className="mb-6 md:mb-0 w-full">
							<motion.a
								href="/"
								className="flex items-center justify-center md:justify-start gap-2 mb-2 group w-fit mx-auto md:mx-0"
								whileHover={{ scale: 1.05 }}
								onClick={(e) => {
									e.preventDefault();
									handleNavClick("/");
								}}
							>
								<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
									<Code2 className="w-6 h-6 text-white" />
								</div>
								<span className="font-outfit font-bold text-xl text-white">
									Zero<span className="text-neon-cyan">Code</span>
								</span>
							</motion.a>
							<p className="text-dark-400 mt-2 text-sm mx-auto md:mx-0 whitespace-nowrap">
								Creando experiencias digitales únicas
							</p>
						</div>
					</div>

					{/* Navigation links */}
					<div className="flex flex-wrap justify-center gap-6">
						{footerLinks.map((link) => (
							<motion.a
								key={link.label}
								href={link.href}
								className="text-dark-400 hover:text-primary-400 transition-colors text-sm font-medium"
								whileHover={{ y: -2 }}
								onClick={(e) => {
									e.preventDefault();
									handleNavClick(link.href);
								}}
							>
								{link.label}
							</motion.a>
						))}
					</div>

					{/* Social links */}
					<div className="flex justify-center md:justify-end gap-4">
						{socialLinks.map((social) => (
							<motion.a
								key={social.label}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 rounded-lg bg-dark-800/50 text-dark-400 hover:text-primary-400 hover:bg-dark-700/50 transition-all"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								aria-label={social.label}
							>
								<social.icon className="w-5 h-5" />
							</motion.a>
						))}
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-8 pt-8 border-t border-dark-700/50">
					<p className="text-center text-dark-500 text-sm flex items-center justify-center gap-1">
						© {currentYear} ZeroCode. {t("footer.madeWith")}{" "}
						<Heart className="w-4 h-4 text-accent-500 fill-accent-500" />{" "}
						{t("footer.by")}{" "}
						<span className="text-primary-400">{t("footer.curiosity")}</span>
					</p>

					{/* SEO Keywords */}
					<div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs text-dark-600">
						<a
							href="/desarrollo-web-pymes-madrid"
							className="hover:text-primary-400 transition-colors font-semibold"
							onClick={(e) => {
								e.preventDefault();
								navigate("/desarrollo-web-pymes-madrid");
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							Desarrollo Web Pymes Madrid
						</a>
						<span>|</span>
						<a
							href="https://wa.me/34912622712"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary-400 transition-colors"
						>
							Contratar Diseñador Web
						</a>
						<span>|</span>
						<a
							href="mailto:admin@zerocode-devops.com"
							className="hover:text-primary-400 transition-colors"
						>
							Contratar Programador Web
						</a>
						<span>|</span>
						<a
							href="https://wa.me/34912622712"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary-400 transition-colors"
						>
							Creación de Páginas Web
						</a>
						<span>|</span>
						<a
							href="mailto:admin@zerocode-devops.com"
							className="hover:text-primary-400 transition-colors"
						>
							Creación de Páginas Web Madrid
						</a>
						<span>|</span>
						<a
							href="https://wa.me/34912622712"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary-400 transition-colors"
						>
							Desarrollo Web a Medida
						</a>
						<span>|</span>
						<a
							href="mailto:admin@zerocode-devops.com"
							className="hover:text-primary-400 transition-colors"
						>
							Desarrollo Web Freelance
						</a>
						<span>|</span>
						<a
							href="https://wa.me/34912622712"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary-400 transition-colors"
						>
							Desarrollo Web Madrid
						</a>
						<span>|</span>
						<a
							href="mailto:admin@zerocode-devops.com"
							className="hover:text-primary-400 transition-colors"
						>
							Diseño UX/UI
						</a>
						<span>|</span>
						<a
							href="https://wa.me/34912622712"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary-400 transition-colors"
						>
							Diseño de Tiendas Online
						</a>
						<span>|</span>
						<a
							href="mailto:admin@zerocode-devops.com"
							className="hover:text-primary-400 transition-colors"
						>
							Diseño Web Freelance Madrid
						</a>
						<span>|</span>
						<a
							href="https://wa.me/34912622712"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary-400 transition-colors"
						>
							Diseño Web para Autónomos
						</a>
						<span>|</span>
						<a
							href="mailto:admin@zerocode-devops.com"
							className="hover:text-primary-400 transition-colors"
						>
							Diseño Web para Pymes
						</a>
						<span>|</span>
						<a
							href="https://wa.me/34912622712"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary-400 transition-colors"
						>
							Diseño Web Profesional
						</a>
						<span>|</span>
						<a
							href="mailto:admin@zerocode-devops.com"
							className="hover:text-primary-400 transition-colors"
						>
							Diseñador Web en Madrid
						</a>
						<span>|</span>
						<a
							href="https://wa.me/34912622712"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary-400 transition-colors"
						>
							Diseñador Web para Empresas
						</a>
						<span>|</span>
						<a
							href="mailto:admin@zerocode-devops.com"
							className="hover:text-primary-400 transition-colors"
						>
							Especialista en Diseño Web
						</a>
						<span>|</span>
						<a
							href="https://wa.me/34912622712"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary-400 transition-colors"
						>
							Mantenimiento Web Profesional
						</a>
						<span>|</span>
						<a
							href="mailto:admin@zerocode-devops.com"
							className="hover:text-primary-400 transition-colors"
						>
							Programador Web Freelance
						</a>
						<span>|</span>
						<a
							href="https://wa.me/34912622712"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary-400 transition-colors"
						>
							Programador Web para Autónomos
						</a>
						<span>|</span>
						<a
							href="mailto:admin@zerocode-devops.com"
							className="hover:text-primary-400 transition-colors"
						>
							Programador Web en Madrid
						</a>
						<span>|</span>
						<a
							href="https://wa.me/34912622712"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary-400 transition-colors"
						>
							Servicios de Diseño Web
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
