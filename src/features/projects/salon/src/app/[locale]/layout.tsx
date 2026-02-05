import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "../globals.css";
import Providers from "@/components/providers";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-heading",
	display: "swap",
});

const lato = Lato({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-body",
	display: "swap",
});

export const metadata: Metadata = {
	title: "ZERO | House of Vanity",
	description: "Experience the pinnacle of luxury styling.",
};

import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;

	// Validate that the incoming `locale` parameter is valid
	if (!["en", "es"].includes(locale)) {
		notFound();
	}

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<base href="/" />
			</head>
			<body
				className={cn(
					"min-h-screen bg-neutral-950 font-body antialiased text-neutral-50 selection:bg-gold-500 selection:text-black",
					playfair.variable,
					lato.variable,
				)}
			>
				<NextIntlClientProvider messages={messages}>
					<Providers>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
