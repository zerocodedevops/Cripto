import { getTranslations } from "next-intl/server";
import BookingWizard from "@/components/booking/BookingWizard";
import prisma from "@/lib/prisma";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Booking" });
	return {
		title: `${t("bookAction")} | ZERO`,
	};
}

export default async function BookPage({
	params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Booking" });

	// Fetch data
	const services = await prisma.service.findMany({
		orderBy: [{ category: "asc" }, { name: "asc" }],
	});
	const staff = await prisma.staff.findMany();

	return (
		<div className="min-h-screen bg-neutral-950 flex flex-col md:flex-row">
			{/* Left Panel - Inspirational / Info */}
			<div className="hidden md:flex w-1/3 bg-neutral-900 border-r border-white/5 flex-col justify-between p-12 relative overflow-hidden">
				<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-20 contrast-125 grayscale" />
				<div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50" />

				<div className="relative z-10">
					<h2 className="text-gold-500 tracking-[0.3em] text-xs uppercase font-bold mb-4">
						House of Vanity
					</h2>
					<h1 className="font-baroque text-5xl text-neutral-100 italic whitespace-pre-line">
						{t("heroTitle")}
					</h1>
				</div>

				<div className="relative z-10 text-neutral-500 text-sm leading-relaxed">
					<p>{t("heroDescription")}</p>
				</div>
			</div>

			{/* Right Panel - Wizard */}
			<div className="flex-1 flex flex-col relative">
				<BookingWizard services={services} staff={staff} />
			</div>
		</div>
	);
}
