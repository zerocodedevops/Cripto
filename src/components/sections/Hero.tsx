/* eslint-disable @typescript-eslint/no-deprecated */
import { motion } from "framer-motion";
// eslint-disable-next-line
import { ArrowDown, Github, Linkedin, Mail, Terminal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";
import { trackEvent } from "@/lib/analytics";

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

export function Hero() {
	const { t } = useTranslation();

	const scrollToSection = (id: string) => {
		const element = document.querySelector(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
			id="hero"
			className="relative flex items-start overflow-hidden pt-32 pb-20"
			data-testid="hero-section"
		>
			{/* Background Elements (Simplified from reference without Particles) */}
			<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[128px] pointer-events-none" />
			<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-[128px] pointer-events-none" />

			{/* Grid Pattern */}
			<div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)]" />

			<div className="container-custom relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						{/* Status Badge */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-8"
						>
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
								<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
							</span>
							{t("hero.available", "Disponible para nuevos proyectos")}
						</motion.div>

						{/* Main Heading */}
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6"
						>
							Diseño y Desarrollo de{" "}
							<span className="text-gradient">Web Apps y SaaS</span> con
							tecnología NoCode
						</motion.h1>

						{/* Typing Animation - Simplified or Removed to focus on message? Keeping it for now but maybe updating list */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="flex items-center gap-3 text-xl md:text-2xl text-dark-400 mb-6"
						>
							<Terminal className="w-5 h-5 text-primary-400" />
							<TypeAnimation
								sequence={[
									"Productos Digitales",
									2000,
									"SaaS & Automatización",
									2000,
									"Web Apps Escalables",
									2000,
								]}
								wrapper="span"
								speed={50}
								repeat={Infinity}
								className="font-mono text-primary-300"
							/>
						</motion.div>

						{/* Description */}
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
							className="text-dark-400 text-lg leading-relaxed mb-12 max-w-lg"
						>
							Lanza tu producto digital en semanas, no meses.
							<br />
							<span className="text-white font-medium">
								La robustez del código
							</span>{" "}
							con la{" "}
							<span className="text-accent-400 font-medium">
								velocidad del diseño visual
							</span>
							.
						</motion.p>

						{/* CTA Buttons & Social Links */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
							className="flex flex-wrap items-center gap-4 mb-2 lg:mb-20 lg:ml-[78px]"
						>
							<motion.button
								onClick={() => {
									scrollToSection("#contact");
									trackEvent("Hero", "Click", "Contact");
								}}
								className="px-8 py-3.5 bg-primary-500 text-white font-bold rounded-full hover:bg-primary-400 transition-colors duration-200 shadow-glow hover:shadow-lg"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<span className="flex items-center gap-2">
									<Mail className="w-5 h-5" />
									{t("hero.cta.contact", "Contáctame")}
								</span>
							</motion.button>

							{/* Social Links */}
							<div className="flex items-center gap-3">
								{socialLinks.map((social, index) => (
									<motion.a
										key={social.label}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 rounded-xl bg-dark-800/50 border border-dark-700 text-dark-400 hover:text-primary-400 hover:border-primary-500/50 hover:shadow-glow transition-all duration-300"
										whileHover={{ y: -3, scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.7 + index * 0.1 }}
										aria-label={social.label}
									>
										<social.icon className="w-5 h-5" />
									</motion.a>
								))}
							</div>
						</motion.div>
					</motion.div>

					{/* Right Content - Code Visual */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						className=""
					>
						<div className="relative">
							{/* Glow Effect */}
							<div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 rounded-2xl blur-3xl opacity-30" />

							{/* Code Window */}
							<div className="relative bg-dark-900/80 backdrop-blur-xl border border-dark-700 rounded-2xl overflow-hidden shadow-2xl">
								{/* Window Header */}
								<div className="flex items-center gap-2 px-4 py-3 bg-dark-800/50 border-b border-dark-700">
									<div className="w-3 h-3 rounded-full bg-red-500/80" />
									<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
									<div className="w-3 h-3 rounded-full bg-green-500/80" />
									<span className="ml-2 text-dark-500 text-sm font-mono">
										developer.js
									</span>
								</div>

								{/* Code Content */}
								<div className="p-6 font-mono text-sm leading-loose">
									<div className="flex gap-4">
										<span className="text-dark-600 select-none">1</span>
										<span>
											<span className="text-accent-400">const</span>{" "}
											<span className="text-primary-300">developer</span>{" "}
											<span className="text-white">=</span> {"{"}
										</span>
									</div>
									<div className="flex gap-4">
										<span className="text-dark-600 select-none">2</span>
										<span className="pl-6">
											<span className="text-primary-300">name</span>
											<span className="text-white">:</span>{" "}
											<span className="text-green-400">"David G."</span>
											<span className="text-white">,</span>
										</span>
									</div>
									<div className="flex gap-4">
										<span className="text-dark-600 select-none">3</span>
										<span className="pl-6">
											<span className="text-primary-300">role</span>
											<span className="text-white">:</span>{" "}
											<span className="text-green-400">
												"Fullstack Developer"
											</span>
											<span className="text-white">,</span>
										</span>
									</div>
									<div className="flex gap-4">
										<span className="text-dark-600 select-none">4</span>
										<span className="pl-6">
											<span className="text-primary-300">approach</span>
											<span className="text-white">:</span>{" "}
											<span className="text-green-400">"AI-First"</span>
											<span className="text-white">,</span>
										</span>
									</div>
									<div className="flex gap-4">
										<span className="text-dark-600 select-none">5</span>
										<span className="pl-6">
											<span className="text-primary-300">passion</span>
											<span className="text-white">:</span>{" "}
											<span className="text-yellow-400">Infinity</span>
											<span className="text-white">,</span>
										</span>
									</div>
									<div className="flex gap-4">
										<span className="text-dark-600 select-none">6</span>
										<span className="pl-6">
											<span className="text-primary-300">available</span>
											<span className="text-white">:</span>{" "}
											<span className="text-accent-400">true</span>
										</span>
									</div>
									<div className="flex gap-4">
										<span className="text-dark-600 select-none">7</span>
										<span>{"}"}</span>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
