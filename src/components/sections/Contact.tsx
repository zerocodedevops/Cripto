import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
/* eslint-disable @typescript-eslint/no-deprecated */
// eslint-disable-next-line
import {
	AlertCircle,
	CheckCircle,
	Github,
	Linkedin,
	Mail,
	MapPin,
	Phone,
	Send,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { z } from "zod";
import { Button } from "@/components/ui";
import { slideInLeft, slideInRight } from "@/hooks/useScrollAnimation";

// Custom WhatsApp Icon since Lucide doesn't have it
const WhatsAppIcon = ({ className }: { className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		className={className}
		stroke="none"
	>
		<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
	</svg>
);

const contactInfo = [
	{
		icon: Mail,
		// label: 'Email', // Replaced by translation
		labelKey: "email",
		value: "zerocode.devops@gmail.com",
		href: "mailto:zerocode.devops@gmail.com",
	},
	{
		icon: WhatsAppIcon,
		labelKey: "whatsapp",
		value: "+34 912 622 712",
		href: "https://wa.me/34912622712",
	},
	{
		icon: MapPin,
		labelKey: "location",
		value: "Madrid, España",
		href: "#",
	},
	{
		// eslint-disable-next-line
		icon: Linkedin,
		labelKey: "linkedin",
		value: "zerocode-devops",
		href: "https://www.linkedin.com/in/zerocode-devops",
	},
	{
		// eslint-disable-next-line
		icon: Github,
		labelKey: "github",
		value: "zerocodedevops",
		href: "https://github.com/zerocodedevops",
	},
];

export function Contact() {
	const { t } = useTranslation();
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const contactSchema = useMemo(
		() =>
			z.object({
				name: z.string().min(2, t("contact.form.validation.name")),
				email: z.string().email(t("contact.form.validation.email")),
				subject: z.string().min(5, t("contact.form.validation.subject")),
				message: z.string().min(10, t("contact.form.validation.message")),
			}),
		[t],
	);

	type ContactFormData = z.infer<typeof contactSchema>;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
	});

	const onSubmit = async (data: ContactFormData) => {
		setStatus("loading");
		setErrorMessage("");

		try {
			// EmailJS configuration
			const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
			const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
			const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

			if (!serviceId || !templateId || !publicKey) {
				// For demo purposes, simulate success
				await new Promise((resolve) => setTimeout(resolve, 1500));
				setStatus("success");
				reset();
				return;
			}

			await emailjs.send(
				serviceId,
				templateId,
				{
					from_name: data.name,
					from_email: data.email,
					subject: data.subject,
					message: data.message,
				},
				publicKey,
			);

			setStatus("success");
			reset();
		} catch {
			setStatus("error");
			setErrorMessage(t("contact.form.error"));
		}
	};

	return (
		<section id="contact" className="section relative">
			{/* Background decoration */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary-500/5 to-transparent blur-3xl" />
			</div>

			<div className="container-custom relative z-10">
				<div className="text-center mb-16">
					<h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
						Hablemos de tu <span className="text-gradient">Proyecto</span>
					</h2>
					<p className="text-xl text-dark-300 font-medium max-w-2xl mx-auto">
						¿Tienes una idea en mente? Me encantaría escucharla
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-12 items-start">
					{/* Contact info */}
					<motion.div
						variants={slideInLeft}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="space-y-8"
					>
						<div className="space-y-4">
							<h3 className="text-2xl font-bold text-white">
								¿Listo para colaborar?
							</h3>
							<p className="text-dark-300 leading-relaxed">
								Estoy abierto a colaborar en proyectos que valoren la{" "}
								<span className="text-primary-400 font-medium">innovación</span>
								, la{" "}
								<span className="text-primary-400 font-medium">
									transparencia
								</span>{" "}
								y el uso estratégico de{" "}
								<span className="text-accent-400 font-medium">IA</span>.
							</p>
						</div>

						<div className="space-y-4">
							<a
								href="mailto:zerocode.devops@gmail.com"
								className="flex items-center gap-4 p-4 rounded-xl bg-dark-900/50 border border-dark-700/50 hover:border-primary-500/30 transition-all group"
							>
								<div className="p-3 rounded-lg bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20 transition-colors">
									<Mail className="w-5 h-5" />
								</div>
								<div>
									<p className="text-dark-400 text-xs uppercase tracking-wider font-medium mb-0.5">
										Email
									</p>
									<p className="text-white font-medium">
										zerocode.devops@gmail.com
									</p>
								</div>
							</a>

							<div className="flex items-center gap-4 p-4 rounded-xl bg-dark-900/50 border border-dark-700/50 hover:border-primary-500/30 transition-all group">
								<div className="p-3 rounded-lg bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20 transition-colors">
									<MapPin className="w-5 h-5" />
								</div>
								<div>
									<p className="text-dark-400 text-xs uppercase tracking-wider font-medium mb-0.5">
										Ubicación
									</p>
									<p className="text-white font-medium">Madrid, España</p>
								</div>
							</div>

							<a
								href="https://www.linkedin.com/in/zerocode-devops"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-4 p-4 rounded-xl bg-dark-900/50 border border-dark-700/50 hover:border-primary-500/30 transition-all group"
							>
								<div className="p-3 rounded-lg bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20 transition-colors">
									<Linkedin className="w-5 h-5" />
								</div>
								<div>
									<p className="text-dark-400 text-xs uppercase tracking-wider font-medium mb-0.5">
										LinkedIn
									</p>
									<p className="text-white font-medium">zerocode-devops</p>
								</div>
							</a>

							<a
								href="https://github.com/zerocodedevops"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-4 p-4 rounded-xl bg-dark-900/50 border border-dark-700/50 hover:border-primary-500/30 transition-all group"
							>
								<div className="p-3 rounded-lg bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20 transition-colors">
									<Github className="w-5 h-5" />
								</div>
								<div>
									<p className="text-dark-400 text-xs uppercase tracking-wider font-medium mb-0.5">
										GitHub
									</p>
									<p className="text-white font-medium">zerocodedevops</p>
								</div>
							</a>
						</div>

						{/* Terminal snippet */}
						<div className="rounded-lg bg-dark-950/80 border border-dark-700/50 overflow-hidden font-mono text-sm leading-relaxed shadow-lg">
							<div className="flex items-center gap-2 px-4 py-2 border-b border-dark-800/50 bg-dark-900/30">
								<span className="text-primary-400">~_</span>
								<span className="text-dark-400">contact.sh</span>
							</div>
							<div className="p-4 space-y-2">
								<div className="flex gap-2">
									<span className="text-dark-500">$</span>
									<span className="text-gray-300">echo $AVAILABILITY</span>
								</div>
								<div className="flex gap-2 pl-4">
									<span className="text-green-400">{">"}</span>
									<span className="text-green-400 font-medium">
										Open for new projects
									</span>
								</div>
								<div className="flex gap-2 mt-3">
									<span className="text-dark-500">$</span>
									<span className="text-gray-300">echo $RESPONSE_TIME</span>
								</div>
								<div className="flex gap-2 pl-4">
									<span className="text-primary-400">{">"}</span>
									<span className="text-primary-400 font-medium">
										Usually within 24 hours
									</span>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Contact form */}
					<motion.div
						variants={slideInRight}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						<form onSubmit={handleSubmit(onSubmit)} className="card p-8">
							<div className="space-y-6">
								{/* Name */}
								<div>
									<label htmlFor="name" className="label">
										{t("contact.form.name")}
									</label>
									<input
										id="name"
										type="text"
										className="input"
										placeholder={t("contact.form.placeholders.name")}
										{...register("name")}
										aria-invalid={errors.name ? "true" : "false"}
										required={true}
									/>
									{errors.name && (
										<p className="mt-1 text-sm text-red-400" role="alert">
											{errors.name.message}
										</p>
									)}
								</div>

								{/* Email */}
								<div>
									<label htmlFor="email" className="label">
										{t("contact.form.email")}
									</label>
									<input
										id="email"
										type="email"
										className="input"
										placeholder={t("contact.form.placeholders.email")}
										{...register("email")}
										aria-invalid={errors.email ? "true" : "false"}
										required={true}
									/>
									{errors.email && (
										<p className="mt-1 text-sm text-red-400" role="alert">
											{errors.email.message}
										</p>
									)}
								</div>

								{/* Subject */}
								<div>
									<label htmlFor="subject" className="label">
										{t("contact.form.subject")}
									</label>
									<input
										id="subject"
										type="text"
										className="input"
										placeholder={t("contact.form.placeholders.subject")}
										{...register("subject")}
										aria-invalid={errors.subject ? "true" : "false"}
									/>
									{errors.subject && (
										<p className="mt-1 text-sm text-red-400" role="alert">
											{errors.subject.message}
										</p>
									)}
								</div>

								{/* Message */}
								<div>
									<label htmlFor="message" className="label">
										{t("contact.form.message")}
									</label>
									<textarea
										id="message"
										className="textarea"
										placeholder={t("contact.form.placeholders.message")}
										rows={5}
										{...register("message")}
										aria-invalid={errors.message ? "true" : "false"}
										required={true}
									/>
									{errors.message && (
										<p className="mt-1 text-sm text-red-400" role="alert">
											{errors.message.message}
										</p>
									)}
								</div>

								{/* Submit button */}
								<Button
									type="submit"
									variant="primary"
									className="w-full"
									isLoading={status === "loading"}
									rightIcon={<Send className="w-5 h-5" />}
								>
									{status === "loading"
										? t("contact.form.sending")
										: t("contact.form.submit")}
								</Button>

								{/* Status messages */}
								<AnimatePresence mode="wait">
									{status === "success" && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400"
										>
											<CheckCircle className="w-5 h-5" />
											<p>{t("contact.form.success")}</p>
										</motion.div>
									)}

									{status === "error" && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
										>
											<AlertCircle className="w-5 h-5" />
											<p>{errorMessage}</p>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</form>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
