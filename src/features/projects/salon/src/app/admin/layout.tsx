import Link from 'next/link'
import { LayoutDashboard, Users, Calendar, Settings, LogOut } from 'lucide-react'
import { Playfair_Display, Lato } from "next/font/google";
import "../globals.css";
import { cn } from "@salon/lib/utils";

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

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={cn(
                "min-h-screen bg-neutral-950 font-body antialiased text-neutral-50 selection:bg-gold-500 selection:text-black",
                playfair.variable,
                lato.variable
            )}>
                <div className="flex h-screen bg-neutral-900 text-neutral-200 font-sans">
                    {/* Sidebar */}
                    <aside className="w-64 border-r border-white/10 bg-black/40 hidden md:flex flex-col">
                        <div className="p-6 border-b border-white/10">
                            <h1 className="text-xl font-heading text-gold-500 tracking-wider">ZERO | Admin</h1>
                        </div>

                        <nav className="flex-1 p-4 space-y-2">
                            <NavItem href="/admin/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
                            <NavItem href="/admin/bookings" icon={<Calendar size={18} />} label="Reservas" />
                            <NavItem href="/admin/staff" icon={<Users size={18} />} label="Staff" />
                            <NavItem href="/admin/settings" icon={<Settings size={18} />} label="Configuración" />
                        </nav>

                        <div className="p-4 border-t border-white/10">
                            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-white/5 rounded-md transition-colors">
                                <LogOut size={18} />
                                <span className="text-sm font-medium">Volver a Web</span>
                            </Link>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 overflow-auto bg-neutral-900">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link href={href} className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-gold-500 hover:bg-gold-500/10 rounded-md transition-colors group">
            <span className="group-hover:text-gold-500">{icon}</span>
            <span className="text-sm font-medium tracking-wide">{label}</span>
        </Link>
    )
}
