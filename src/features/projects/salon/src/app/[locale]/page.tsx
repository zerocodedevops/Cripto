import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Home() {
	const t = useTranslations("HomePage");
	const locale = useLocale();

	return (
		<main className="relative min-h-screen flex flex-col justify-between bg-neutral-950 overflow-hidden selection:bg-[#BF953F] selection:text-black">
			{/* Ambient Lighting */}
			<div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#BF953F]/10 to-transparent pointer-events-none" />
			<div className="absolute -top-[200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-[#BF953F]/5 blur-[120px] pointer-events-none" />

			{/* Navigation */}
			<nav className="relative z-10 w-full p-8 flex justify-between items-center border-b border-white/5 backdrop-blur-sm">
				<div className="text-xs tracking-[0.3em] font-bold text-[#FCF6BA] uppercase">
					{t("branding")}
				</div>
				<a
					href="/auth/login"
					className="text-xs tracking-[0.2em] font-medium text-neutral-400 hover:text-[#FCF6BA] transition-colors uppercase"
				>
					{t("login")}
				</a>
			</nav>

			{/* Centerpiece */}
			<section className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center space-y-12">
				{/* Ornamental Divider */}
				<div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[#BF953F] to-transparent opacity-50" />

				<div className="space-y-6 max-w-4xl mx-auto">
					<h2 className="font-baroque italic text-2xl md:text-3xl text-[#BF953F] opacity-90">
						{t("welcome")}
					</h2>

					<h1 className="font-baroque text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none">
						<span className="block text-gradient-gold drop-shadow-2xl">
							ZERO
						</span>
					</h1>

					<p className="font-body text-neutral-400 max-w-lg mx-auto leading-relaxed tracking-wide text-sm md:text-base border-t border-white/10 pt-6 mt-6">
						{t("description")}
					</p>
				</div>

				{/* CTA Buttons - Baroque Style */}
				<div className="flex flex-col sm:flex-row gap-8 items-center pt-8">
					<Link
						href={`/${locale}/book`}
						className="group relative px-8 py-4 bg-transparent overflow-hidden"
					>
						<div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
						<div className="absolute inset-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#BF953F] to-transparent left-0 opacity-50" />
						<div className="absolute inset-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#BF953F] to-transparent right-0 opacity-50" />
						<span className="relative font-baroque italic text-xl text-[#FCF6BA] group-hover:text-white transition-colors pr-2">
							{t("bookButton")}
						</span>
						<span className="relative text-xs tracking-widest text-[#BF953F] uppercase">
							_01
						</span>
					</Link>

					<a
						href="/auth/login"
						className="group relative px-8 py-4 bg-transparent"
					>
						<span className="font-body text-xs tracking-[0.2em] text-neutral-500 group-hover:text-[#BF953F] transition-colors uppercase border-b border-transparent group-hover:border-[#BF953F] pb-1">
							{t("portalButton")}
						</span>
					</a>
				</div>
			</section>

			{/* Footer */}
			<footer className="relative z-10 w-full p-8 border-t border-white/5 flex justify-between items-end">
				<div className="text-[10px] text-neutral-600 tracking-widest uppercase space-y-1">
					<p>{t("footerLocations")}</p>
					<p>{t("rights")}</p>
				</div>
				<div className="text-[10px] text-neutral-700 font-mono tracking-widest">
					S_27.00.41
				</div>
			</footer>
		</main>
	);
}
