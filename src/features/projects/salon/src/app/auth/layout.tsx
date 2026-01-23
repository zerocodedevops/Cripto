import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "../globals.css";
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
    title: "ZERO | Auth",
    description: "Secure Access",
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(
                "min-h-screen bg-neutral-950 font-body antialiased text-neutral-50 selection:bg-gold-500 selection:text-black",
                playfair.variable,
                lato.variable
            )}>
                {children}
            </body>
        </html>
    );
}
