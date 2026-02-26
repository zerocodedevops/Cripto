import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
	AlertCircle,
	Check,
	CheckCircle,
	Layout as LayoutIcon,
	Mail,
	MessageSquare,
	Package,
	RotateCcw,
	Send,
	ShieldCheck,
	Sparkles,
	Target,
	User,
	X,
	Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

interface PricingItem {
	id: string;
	name: string;
	description: string;
	price: number;
}

interface PricingCategory {
	icon: any;
	items: PricingItem[];
}

const CATEGORIES: Record<string, PricingCategory> = {
	"Estructura y Secciones": {
		icon: LayoutIcon,
		items: [
			{
				id: "inicio",
				name: "Página de Inicio",
				description:
					"Landing page con propuesta de valor y servicios destacados.",
				price: 250,
			},
			{
				id: "servicios",
				name: "Servicios",
				description: "Detalle completo de lo que ofreces a tus clientes.",
				price: 150,
			},
			{
				id: "sobre-mi",
				name: "Nuestro Equipo",
				description: "Para generar confianza y cercanía con tu audiencia.",
				price: 120,
			},
			{
				id: "contacto",
				name: "Contacto",
				description: "Formulario, mapa interactivo y datos de contacto.",
				price: 100,
			},
			{
				id: "ubicacion",
				name: "Ubicación y Horarios",
				description: "Mapa de Google y horarios de apertura local.",
				price: 80,
			},
		],
	},
	"Diseño y Experiencia": {
		icon: Sparkles,
		items: [
			{
				id: "responsive",
				name: 'Diseño "Responsive"',
				description: "Adaptación perfecta a todos los móviles y tablets.",
				price: 200,
			},
			{
				id: "personalizado",
				name: "Diseño a Medida",
				description: "Identidad única creada desde cero para tu marca.",
				price: 500,
			},
			{
				id: "velocidad",
				name: "Optimización Velocidad",
				description: "Carga ultrarrápida para mejorar la retención.",
				price: 150,
			},
		],
	},
	"SEO y Visibilidad": {
		icon: Target,
		items: [
			{
				id: "seo-google",
				name: "SEO Google",
				description: "Optimización inicial para aparecer en buscadores.",
				price: 300,
			},
			{
				id: "google-business",
				name: "Google Business Profile",
				description: "Optimización de tu ficha de Google Maps.",
				price: 120,
			},
			{
				id: "redes",
				name: "Enlace a WhatsApp y RR.SS.",
				description: "Conexión directa con tus perfiles sociales.",
				price: 80,
			},
		],
	},
	"Comunicación y Leads": {
		icon: MessageSquare,
		items: [
			{
				id: "email-corp",
				name: "Email Corporativo",
				description: "Cuentas de correo con tu propio dominio.",
				price: 100,
			},
			{
				id: "whatsapp",
				name: "Botón WhatsApp Directo",
				description: "Comunicación instantánea con un solo clic.",
				price: 80,
			},
		],
	},
	"Seguridad y Mantenimiento": {
		icon: ShieldCheck,
		items: [
			{
				id: "ssl",
				name: "Certificado SSL (HTTPS)",
				description: "Candado verde y navegación encriptada.",
				price: 50,
			},
			{
				id: "rgpd",
				name: "RGPD Completo (4 Productos)",
				description: "Aviso Legal, Cookies, Privacidad y Términos.",
				price: 250,
			},
			{
				id: "hosting",
				name: "Hosting (1 Año)",
				description: "Alojamiento rápido y seguro para tu web.",
				price: 150,
			},
			{
				id: "dominio",
				name: "Dominio (1 Año)",
				description: "Tu nombre en internet (.es o .com).",
				price: 20,
			},
			{
				id: "soporte",
				name: "Soporte Técnico Averías (1 Año)",
				description: "Asistencia ante cualquier error técnico.",
				price: 250,
			},
			{
				id: "actualizacion",
				name: "Actualización Mensual (1 Año)",
				description: "Mantenimiento del sistema y seguridad.",
				price: 400,
			},
		],
	},
};

const PACKS = {
	basico: {
		name: "Pack Básico",
		price: 700,
		originalPrice: 1760,
		description: "Todo lo esencial para una presencia web profesional y legal",
		optionsCount: 13,
		items: [
			"inicio",
			"servicios",
			"contacto",
			"ubicacion",
			"responsive",
			"ssl",
			"rgpd",
			"hosting",
			"dominio",
			"soporte",
		],
	},
	silver: {
		name: "Pack Silver",
		price: 1400,
		originalPrice: 2940,
		description: "Web completa optimizada con diseño profesional y SEO Google",
		optionsCount: 19,
		items: [
			"inicio",
			"servicios",
			"sobre-mi",
			"contacto",
			"ubicacion",
			"responsive",
			"velocidad",
			"seo-google",
			"redes",
			"email-corp",
			"ssl",
			"rgpd",
			"hosting",
			"dominio",
			"soporte",
			"actualizacion",
		],
	},
};

import { sileo } from "sileo";

const contactSchema = z.object({
	name: z.string().min(2, "El nombre es demasiado corto"),
	email: z.string().email("Email inválido"),
	message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function PricingConfigurator() {
	const [selections, setSelections] = useState<Record<string, boolean>>({});
	const [selectedPack, setSelectedPack] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
	});

	const toggleSelection = (id: string) => {
		if (
			selectedPack &&
			PACKS[selectedPack as keyof typeof PACKS].items.includes(id) &&
			selections[id]
		) {
			if (
				!confirm(
					"Este elemento forma parte del pack activo. ¿Deseas deseleccionar el pack completo?",
				)
			)
				return;
			setSelectedPack(null);
		}
		setSelections((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const applyPack = (packId: string) => {
		if (selectedPack === packId) {
			setSelectedPack(null);
			setSelections({});
			return;
		}

		setSelectedPack(packId);
		const newSelections: Record<string, boolean> = {};
		PACKS[packId as keyof typeof PACKS].items.forEach(
			(id) => (newSelections[id] = true),
		);
		setSelections(newSelections);
	};

	const totalPrice = useMemo(() => {
		let total = 0;
		const allItems = Object.values(CATEGORIES).flatMap((cat) => cat.items);

		if (selectedPack) {
			const pack = PACKS[selectedPack as keyof typeof PACKS];
			total += pack.price;
			const packItemsSet = new Set(pack.items);

			allItems.forEach((item) => {
				if (selections[item.id] && !packItemsSet.has(item.id)) {
					total += item.price;
				}
			});
		} else {
			allItems.forEach((item) => {
				if (selections[item.id]) total += item.price;
			});
		}
		return total;
	}, [selections, selectedPack]);

	const selectedCount = Object.values(selections).filter(Boolean).length;

	const onSubmit = async (formData: ContactFormData) => {
		setStatus("loading");
		const allItems = Object.values(CATEGORIES).flatMap((cat) => cat.items);
		const selected = allItems.filter((item) => selections[item.id]);

		let selectionText = "";
		if (selectedPack)
			selectionText += `PACK: ${PACKS[selectedPack as keyof typeof PACKS].name} (${PACKS[selectedPack as keyof typeof PACKS].price}€)\n`;
		selectionText += `SERVICIOS:\n${selected.map((i) => `- ${i.name}`).join("\n")}`;
		selectionText += `\nTOTAL ESTIMADO: ${totalPrice}€ + IVA`;

		const messageSuffix = formData.message ?? "Sin mensaje";
		try {
			await emailjs.send(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
				{
					from_name: formData.name,
					from_email: formData.email,
					subject: `Solicitud de Presupuesto - ${totalPrice}€`,
					message: `El cliente ha configurado el siguiente presupuesto:\n\n${selectionText}\n\nMensaje adicional: ${messageSuffix}`,
				},
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
			);
			sileo.success({
				title: "Solicitud enviada",
				description: "Analizaremos tu presupuesto y te contactaremos pronto.",
			});
			setStatus("success");
			setTimeout(() => {
				setIsModalOpen(false);
				setStatus("idle");
				reset();
			}, 2000);
		} catch {
			sileo.error({
				title: "Error al enviar",
				description:
					"Hubo un problema al procesar tu solicitud. Inténtalo de nuevo.",
			});
			setStatus("error");
		}
	};

	return (
		<div className="space-y-12">
			{/* Packs Selection */}
			<div className="grid md:grid-cols-2 gap-6">
				{Object.entries(PACKS).map(([id, pack]) => (
					<motion.div
						key={id}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={() => applyPack(id)}
						className={cn(
							selectedPack === id
								? "border-primary-500 bg-primary-500/10 shadow-glow"
								: "border-dark-800 bg-dark-900/50 hover:border-dark-700",
							"cursor-pointer p-8 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden",
						)}
					>
						{id === "silver" && (
							<div className="absolute top-4 right-4 px-3 py-1 bg-primary-500 text-white text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-lg shadow-primary-500/20">
								Popular
							</div>
						)}
						<div className="flex justify-between items-start mb-6">
							<div className="p-3 rounded-2xl bg-dark-800 text-primary-400">
								<Package className="w-6 h-6" />
							</div>
							<div className="text-right">
								<span className="text-sm text-dark-500 line-through block font-medium opacity-60">
									{pack.originalPrice}€
								</span>
								<div className="text-4xl font-bold text-white">
									{pack.price}€
								</div>
							</div>
						</div>
						<h3 className="text-2xl font-bold text-white mb-2">{pack.name}</h3>
						<p className="text-dark-400 text-sm mb-6 leading-relaxed">
							{pack.description}
						</p>

						<div className="space-y-3 mb-8">
							<div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wide">
								<Zap className="w-4 h-4" />
								<span>Ahorras {pack.originalPrice - pack.price}€</span>
							</div>
							<div className="flex items-center gap-2 text-dark-400 text-xs font-medium">
								<CheckCircle className="w-4 h-4 text-primary-500/50" />
								<span>{pack.optionsCount} opciones incluidas</span>
							</div>
						</div>

						<div className="flex items-center gap-2 text-primary-400 font-bold text-sm bg-primary-500/10 w-fit px-4 py-2 rounded-xl">
							{selectedPack === id ? (
								<Check className="w-5 h-5" />
							) : (
								<div className="w-5 h-5 border-2 border-primary-500/30 rounded-full" />
							)}
							<span>
								{selectedPack === id ? "Pack Seleccionado" : "Elegir este Pack"}
							</span>
						</div>
					</motion.div>
				))}
			</div>

			{/* Detailed Options */}
			<div className="space-y-10">
				{Object.entries(CATEGORIES).map(([catName, data]) => (
					<div key={catName} className="space-y-6">
						<div className="flex items-center gap-3 border-b border-dark-800 pb-4">
							<div className="p-2 rounded-lg bg-primary-500/10 text-primary-400">
								<data.icon className="w-5 h-5" />
							</div>
							<h2 className="text-2xl font-bold text-white uppercase tracking-tight text-sm md:text-xl font-outfit">
								{catName}
							</h2>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
							{data.items.map((item) => {
								const isSelected = selections[item.id];
								const isInPack =
									selectedPack &&
									PACKS[selectedPack as keyof typeof PACKS].items.includes(
										item.id,
									);

								let cardClasses =
									"p-4 rounded-2xl border-2 cursor-pointer transition-all flex gap-4 items-start group";
								if (isSelected) {
									cardClasses += isInPack
										? " border-primary-500/50 bg-primary-500/5"
										: " border-accent-500/50 bg-accent-500/5";
								} else {
									cardClasses +=
										" border-dark-800 bg-dark-900/30 hover:border-dark-700";
								}

								return (
									<motion.div
										key={item.id}
										whileHover={{ y: -2 }}
										onClick={() => toggleSelection(item.id)}
										className={cardClasses}
									>
										<div
											className={cn(
												"mt-1 w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all",
												isSelected
													? "bg-primary-500 border-primary-500 text-white"
													: "border-dark-700 bg-dark-800 group-hover:border-primary-500/50",
											)}
										>
											{isSelected ? (
												<Check className="w-4 h-4" />
											) : (
												<X className="w-3 h-3 text-dark-600" />
											)}
										</div>
										<div className="flex-1">
											<div className="flex justify-between items-start mb-1">
												<h4 className="font-bold text-white text-sm">
													{item.name}
												</h4>
												{isInPack && (
													<span className="text-[10px] font-bold bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded-full">
														PACK
													</span>
												)}
											</div>
											<p className="text-dark-500 text-[11px] leading-tight">
												{item.description}
											</p>
										</div>
									</motion.div>
								);
							})}
						</div>
					</div>
				))}
			</div>

			{/* Floating Summary Bar */}
			<AnimatePresence>
				{selectedCount > 0 && (
					<motion.div
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						className="fixed bottom-8 left-4 right-4 md:left-auto md:right-auto md:left-1/2 md:-translate-x-1/2 w-auto max-w-[calc(100vw-2rem)] md:max-w-4xl z-50 px-4"
					>
						<div className="bg-dark-950/80 backdrop-blur-2xl border border-primary-500/30 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
							<div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

							<div className="flex items-center gap-6">
								<div className="hidden sm:flex flex-col">
									<span className="text-dark-500 text-xs font-bold uppercase tracking-widest font-outfit">
										Opciones
									</span>
									<span className="text-white font-bold text-xl">
										{selectedCount}
									</span>
								</div>
								<div className="h-8 w-px bg-dark-800 hidden sm:block" />
								<div className="flex flex-col">
									<span className="text-primary-400 text-xs font-bold uppercase tracking-widest font-outfit">
										Solicitud de
									</span>
									<span className="text-white font-bold text-3xl font-outfit">
										Presupuesto
										<span className="text-sm text-dark-500 ml-1 font-normal"> a Medida</span>
									</span>
								</div>
							</div>

							<div className="flex gap-4 w-full md:w-auto">
								<button
									onClick={() => {
										setSelections({});
										setSelectedPack(null);
									}}
									className="p-4 rounded-2xl bg-dark-800 text-dark-400 hover:text-white transition-all border border-dark-700"
									title="Reiniciar"
								>
									<RotateCcw className="w-6 h-6" />
								</button>
								<button
									onClick={() => setIsModalOpen(true)}
									className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary-500/20 font-outfit"
								>
									<Send className="w-5 h-5" />
									<span>Solicitar Presupuesto</span>
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Contact Modal */}
			<AnimatePresence>
				{isModalOpen && (
					<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsModalOpen(false)}
							className="absolute inset-0 bg-dark-950/80 backdrop-blur-md"
						/>
						<motion.div
							initial={{ scale: 0.9, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.9, opacity: 0, y: 20 }}
							className="relative w-full max-w-lg bg-dark-900 border border-dark-700 rounded-3xl p-8 shadow-2xl overflow-hidden"
						>
							<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500" />

							<div className="flex justify-between items-center mb-8">
								<h2 className="text-2xl font-bold text-white font-outfit">
									Finaliza tu solicitud
								</h2>
								<button
									onClick={() => setIsModalOpen(false)}
									className="text-dark-500 hover:text-white transition-colors"
								>
									<X className="w-6 h-6" />
								</button>
							</div>

							<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
								<div className="space-y-4">
									<div className="relative">
										<User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
										<input
											{...register("name")}
											placeholder="Tu nombre completo"
											className="w-full bg-dark-800 border border-dark-700 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary-500/50 transition-all outline-none"
										/>
										{errors.name && (
											<p className="text-red-400 text-xs mt-1 ml-4">
												{errors.name.message}
											</p>
										)}
									</div>

									<div className="relative">
										<Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
										<input
											{...register("email")}
											placeholder="Email de contacto"
											className="w-full bg-dark-800 border border-dark-700 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary-500/50 transition-all outline-none"
										/>
										{errors.email && (
											<p className="text-red-400 text-xs mt-1 ml-4">
												{errors.email.message}
											</p>
										)}
									</div>

									<textarea
										{...register("message")}
										placeholder="¿Alguna instrucción o duda adicional? (Opcional)"
										rows={3}
										className="w-full bg-dark-800 border border-dark-700 rounded-xl py-4 px-4 text-white focus:border-primary-500/50 transition-all outline-none resize-none"
									/>
								</div>

								<div className="bg-primary-500/5 border border-primary-500/20 rounded-2xl p-4 space-y-2">
									<div className="flex justify-between text-sm">
										<span className="text-dark-400">Tipo de Proyecto:</span>
										<span className="text-white font-bold">
											{selectedPack
												? PACKS[selectedPack as keyof typeof PACKS].name
												: "Configuración a Medida"}
										</span>
									</div>
									<div className="flex justify-between text-xs">
										<span className="text-dark-500">
											Opciones seleccionadas:
										</span>
										<span className="text-primary-400">
											{selectedCount} de 20
										</span>
									</div>
								</div>

								<button
									disabled={status === "loading" || status === "success"}
									className={cn(
										"w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all font-outfit",
										status === "success"
											? "bg-green-600 text-white"
											: "bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/20",
									)}
								>
									{(() => {
										if (status === "loading") {
											return (
												<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
											);
										}
										if (status === "success") {
											return (
												<>
													<CheckCircle className="w-5 h-5" />{" "}
													<span>Enviado con éxito</span>
												</>
											);
										}
										return (
											<>
												<Send className="w-5 h-5" />{" "}
												<span>Enviar Solicitud</span>
											</>
										);
									})()}
								</button>

								{status === "error" && (
									<div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
										<AlertCircle className="w-4 h-4" />
										<span>Error al enviar. Inténtalo de nuevo.</span>
									</div>
								)}
							</form>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}
