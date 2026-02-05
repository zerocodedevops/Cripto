/* eslint-disable @typescript-eslint/no-deprecated */
import { motion } from "framer-motion";
import {
	ExternalLink,
	FileCode,
	GitCommit,
	Github as GithubIcon,
	Star,
	Users,
} from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { Button, TechBadge } from "@/components/ui";
import {
	fadeInUp,
	slideInLeft,
	slideInRight,
} from "@/hooks/useScrollAnimation";

const featuredProject = {
	// title: 'Sistema de Gestión de Limpieza de Comunidades', // Translated
	// subtitle: 'Proyecto Destacado', // Translated
	// description: ..., // Translated
	features: [
		"dashboard",
		"management",
		"calendar",
		"realtime",
		"pdf",
		"mobile",
	], // Keys for translation
	stack: [
		"React",
		"TypeScript",
		"Vite",
		"Tailwind",
		"Firebase",
		"Supabase",
		"Capacitor",
	],
	stats: {
		lines: "31K+",
		files: "222",
		components: "151",
		commits: "100+",
	},
	demoUrl: "https://j-barranco.web.app",
	repoUrl: "https://github.com/zerocodedevops",
};

import featuredProjectImage from "@/assets/projects/featured_project_dashboard.jpg";

export function FeaturedProject() {
	const { t } = useTranslation();

	return (
		<section className="section relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary-500/10 to-transparent blur-3xl" />
				<div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent-500/10 to-transparent blur-3xl" />
			</div>

			<div className="container-custom relative z-10">
				<div className="mb-12 text-center">
					<h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
						Proyectos <span className="text-gradient">Destacados</span>
					</h2>
					<p className="text-xl text-dark-300 font-medium max-w-2xl mx-auto">
						SaaS empresarial real en producción
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Visual side - Code Preview */}
					<motion.div
						className="relative"
						variants={slideInLeft}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						<div className="relative group">
							{/* Glow effect */}
							<div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl" />

							{/* Main frame - Single Image */}
							<div className="relative bg-dark-900 border border-dark-700/50 rounded-2xl overflow-hidden shadow-2xl aspect-[16/10]">
								<img
									src={featuredProjectImage}
									alt="ZeroCode Project Dashboard"
									className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
									referrerPolicy="no-referrer"
								/>
							</div>
						</div>
					</motion.div>

					{/* Content side */}
					<motion.div
						variants={slideInRight}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{/* Badge */}
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/30 text-accent-400 text-sm font-medium mb-4">
							<Star className="w-4 h-4" />
							{t("featuredProject.badge")}
						</div>

						<h3 className="text-2xl sm:text-3xl font-bold text-dark-100 mb-4">
							{t("featuredProject.projectTitle")}
						</h3>

						<p className="text-dark-400 text-sm sm:text-base mb-6 leading-relaxed">
							{t("featuredProject.description")}
						</p>

						<div className="mb-6 p-4 rounded-lg bg-primary-500/5 border border-primary-500/10">
							<p className="text-sm text-dark-300 italic">
								<Trans i18nKey="featuredProject.quote">
									"Este sistema fue desarrollado{" "}
									<span className="text-primary-400 font-medium">
										sin formación previa
									</span>
									, guiado completamente por{" "}
									<span className="text-accent-400 font-medium">IA</span> y{" "}
									<span className="text-green-400 font-medium">
										validado en producción
									</span>
									."
								</Trans>
							</p>
						</div>

						{/* Features list */}
						<ul className="space-y-2 mb-6">
							{featuredProject.features.map((featureKey, index) => (
								<motion.li
									key={featureKey}
									className="flex items-start gap-3 text-dark-300 text-sm"
									variants={fadeInUp}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
									custom={index}
								>
									<span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
									{t(`featuredProject.features.${featureKey}`)}
								</motion.li>
							))}
						</ul>

						{/* Tech stack */}
						<div className="mb-6">
							<p className="text-dark-500 text-sm mb-3">
								{t("featuredProject.stackTitle")}
							</p>
							<div className="flex flex-wrap gap-2">
								{featuredProject.stack.map((tech) => (
									<TechBadge key={tech} tech={tech} />
								))}
							</div>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-dark-800/30 rounded-xl border border-dark-700/50">
							<div className="text-center">
								<div className="flex items-center justify-center gap-1 text-xl font-bold text-primary-400">
									<FileCode className="w-4 h-4" />
									{featuredProject.stats.lines}
								</div>
								<div className="text-dark-500 text-xs">
									{t("featuredProject.stats.lines")}
								</div>
							</div>
							<div className="text-center">
								<div className="text-xl font-bold text-accent-400">
									{featuredProject.stats.files}
								</div>
								<div className="text-dark-500 text-xs">
									{t("featuredProject.stats.files")}
								</div>
							</div>
							<div className="text-center">
								<div className="flex items-center justify-center gap-1 text-xl font-bold text-green-400">
									<Users className="w-4 h-4" />
									{featuredProject.stats.components}
								</div>
								<div className="text-dark-500 text-xs">
									{t("featuredProject.stats.components")}
								</div>
							</div>
							<div className="text-center">
								<div className="flex items-center justify-center gap-1 text-xl font-bold text-orange-400">
									<GitCommit className="w-4 h-4" />
									{featuredProject.stats.commits}
								</div>
								<div className="text-dark-500 text-xs">
									{t("featuredProject.stats.commits")}
								</div>
							</div>
						</div>

						{/* Action buttons */}
						<div className="flex flex-wrap gap-4">
							<Button
								variant="primary"
								leftIcon={<ExternalLink className="w-5 h-5" />}
								onClick={() => window.open(featuredProject.demoUrl, "_blank")}
							>
								{t("featuredProject.buttons.demo")}
							</Button>
							<Button
								variant="outline"
								leftIcon={<GithubIcon className="w-5 h-5" />}
								onClick={() => window.open(featuredProject.repoUrl, "_blank")}
							>
								{t("featuredProject.buttons.code")}
							</Button>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
