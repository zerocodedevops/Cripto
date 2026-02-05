/* eslint-disable @typescript-eslint/no-deprecated */
import { motion } from "framer-motion";
// eslint-disable-next-line
import { ArrowUp, Code2, Github, Heart, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const socialLinks = [
	// eslint-disable-next-line
	{ icon: Github, href: "https://github.com/zerocodedevops", label: "GitHub" },
	// eslint-disable-next-line
	{
		icon: Linkedin,
		href: "https://www.linkedin.com/in/zerocode-devops",
		label: "LinkedIn",
	},
	{ icon: Mail, href: "mailto:zerocode.devops@gmail.com", label: "Email" },
];

export function Footer() {
	const { t } = useTranslation();

	const footerLinks = [
		{ label: t("nav.home"), href: "#hero" },
		{ label: t("nav.about"), href: "#about" },
		{ label: t("nav.skills"), href: "#skills" },
		{ label: t("nav.projects"), href: "#projects" },
		{ label: t("nav.contact"), href: "#contact" },
	];

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
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
								href="#hero"
								className="flex items-center justify-center md:justify-start gap-2 mb-2 group w-fit mx-auto md:mx-0"
								whileHover={{ scale: 1.05 }}
								onClick={(e) => {
									e.preventDefault();
									document
										.querySelector("#hero")
										?.scrollIntoView({ behavior: "smooth" });
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
								{t("footer.tagline")}
							</p>
						</div>
					</div>

					{/* Navigation links */}
					<div className="flex flex-wrap justify-center gap-6">
						{footerLinks.map((link) => (
							<motion.a
								key={link.href}
								href={link.href}
								className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
								whileHover={{ y: -2 }}
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
				</div>
			</div>
		</footer>
	);
}
