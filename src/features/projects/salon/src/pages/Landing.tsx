import { Link } from 'react-router-dom'
import { Calendar, Scissors, Sparkles, Star } from 'lucide-react'

export default function Landing() {
    return (
        <div className="min-h-screen bg-black text-[#FCF6BA] font-body selection:bg-[#BF953F] selection:text-black">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#BF953F]/10 to-transparent opacity-50" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
            </div>

            {/* Navbar */}
            <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 border border-[#BF953F] flex items-center justify-center rotate-45">
                        <span className="font-heading text-2xl -rotate-45 text-[#BF953F]">Z</span>
                    </div>
                    <span className="font-heading text-xl tracking-widest uppercase text-white">Zero Salon</span>
                </div>
                <div>
                    <Link to="/auth/login" className="px-6 py-2 border border-[#BF953F] text-[#BF953F] hover:bg-[#BF953F] hover:text-black transition-all duration-300 uppercase text-xs font-bold tracking-widest rounded-sm">
                        Acceso Admin
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-20 md:mt-32 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Sparkles size={14} className="text-[#BF953F]" />
                    <span className="text-xs uppercase tracking-widest text-neutral-400">La excelencia en gestión</span>
                </div>

                <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-[#FCF6BA] via-[#BF953F] to-[#AA771C] mb-6 animate-in fade-in zoom-in-95 duration-1000 delay-100">
                    Golden Baroque
                </h1>

                <p className="max-w-2xl text-lg text-neutral-400 mb-12 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Eleva la experiencia de tu salón con un sistema de reservas diseñado para la distinción.
                    Donde la funcionalidad se encuentra con el arte.
                </p>

                <div className="flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <Link to="/auth/login" className="group relative px-8 py-4 bg-[#BF953F] text-black font-bold uppercase tracking-widest overflow-hidden rounded-sm hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center gap-3">
                            RESERVAR CITA <Calendar size={18} />
                        </span>
                    </Link>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full text-left">
                    <FeatureCard
                        icon={<Scissors className="text-[#BF953F]" />}
                        title="Estilismo Premium"
                        desc="Gestión impecable de servicios de alta costura para tus clientes más exigentes."
                        delay={400}
                    />
                    <FeatureCard
                        icon={<Calendar className="text-[#BF953F]" />}
                        title="Agenda Inteligente"
                        desc="Organización perfecta del tiempo, diseñada para maximizar la productividad y el confort."
                        delay={500}
                    />
                    <FeatureCard
                        icon={<Star className="text-[#BF953F]" />}
                        title="Experiencia VIP"
                        desc="Cada detalle cuenta. Ofrece un servicio que tus clientes nunca olvidarán."
                        delay={600}
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 w-full border-t border-white/5 mt-32 py-8 text-center">
                <p className="text-neutral-600 text-xs uppercase tracking-widest">© 2026 Zero Salon. The Art of Coding.</p>
            </footer>
        </div>
    )
}

function FeatureCard({ icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) {
    return (
        <div className={`p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-backwards`} style={{ animationDelay: `${delay}ms` }}>
            <div className="mb-4">{icon}</div>
            <h3 className="font-heading text-xl text-[#FCF6BA] mb-2">{title}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}
