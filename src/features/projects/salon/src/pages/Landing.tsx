import { Link } from 'react-router-dom'
import { Calendar, Scissors, Sparkles, Star } from 'lucide-react'
import logoHero from '@salon/assets/logo-zerovanity-hero.webp'
import logoNavbar from '@salon/assets/logo-zerovanity-navbar.webp'
import teamImage from '@salon/assets/team-zerovanity.webp'
import serviceHaircut from '@salon/assets/services/service-haircut.webp'
import serviceColor from '@salon/assets/services/service-color.webp'
import serviceBalayage from '@salon/assets/services/service-balayage.webp'
import serviceTreatment from '@salon/assets/services/service-treatment.webp'
import serviceKeratin from '@salon/assets/services/service-keratin.webp'
import serviceExtensions from '@salon/assets/services/service-extensions.webp'
import servicePostizo from '@salon/assets/services/service-postizo.webp'
import serviceRastas from '@salon/assets/services/service-rastas.webp'
import serviceAlisado from '@salon/assets/services/service-alisado.webp'
import serviceTrenzas from '@salon/assets/services/service-trenzas.webp'
import serviceAsesoria from '@salon/assets/services/service-asesoria.webp'
import serviceMaquillaje from '@salon/assets/services/service-maquillaje.webp'
import serviceManicura from '@salon/assets/services/service-manicura.webp'
import servicePedicura from '@salon/assets/services/service-pedicura.webp'
import serviceDepilacion from '@salon/assets/services/service-depilacion.webp'
import galleryLook1 from '@salon/assets/gallery/gallery-look-1.webp'
import galleryLook2 from '@salon/assets/gallery/gallery-look-2.webp'
import galleryLook3 from '@salon/assets/gallery/gallery-look-3.webp'
import galleryLook4 from '@salon/assets/gallery/gallery-look-4.webp'

export default function Landing() {
    return (
        <div className="min-h-screen bg-background text-[#FCF6BA] font-body selection:bg-[#BF953F] selection:text-black">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#BF953F]/10 to-transparent opacity-50" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
            </div>

            {/* Navbar */}
            <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src={logoNavbar} alt="Zero Vanity Logo" className="h-12 w-auto object-contain" />
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {['Inicio', 'Nosotros', 'Servicios', 'Galería', 'Blog', 'FAQs', 'Contacto'].map((item) => {
                        let targetId = item.toLowerCase().replace('á', 'a').replace(' ', '-');
                        if (item === 'Inicio') {
                            targetId = 'top';
                        } else if (item === 'Nosotros') {
                            targetId = 'sobre-nosotros';
                        }

                        return (
                            <li key={item}>
                                <button
                                    onClick={() => {
                                        if (item === 'Inicio') {
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        } else {
                                            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className="text-sm uppercase tracking-widest text-[#FCF6BA] hover:text-[#BF953F] transition-colors font-body font-medium bg-transparent border-none cursor-pointer"
                                >
                                    {item}
                                </button>
                            </li>
                        )
                    })}
                </ul>

                <div>
                    <Link to="auth/login" className="px-6 py-2 border border-[#BF953F] text-[#BF953F] hover:bg-[#BF953F] hover:text-black transition-all duration-300 uppercase text-xs font-bold tracking-widest rounded-sm">
                        Acceso Admin
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-16 md:mt-24 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Sparkles size={14} className="text-[#BF953F]" />
                    <span className="text-xs uppercase tracking-widest text-neutral-400">Peluquería • Estética</span>
                </div>

                <div className="w-full max-w-3xl mb-12 animate-in fade-in zoom-in-95 duration-1000 delay-100 p-4">
                    <img
                        src={logoHero}
                        alt="Zero Vanity"
                        className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(191,149,63,0.3)]"
                    />
                </div>

                <p className="max-w-2xl text-lg text-neutral-400 mb-12 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Bienvenido a Zero Vanity, donde la estética de vanguardia se une al lujo atemporal.
                    Descubre un espacio dedicado exclusivamente a tu imagen y bienestar, con tratamientos personalizados y un equipo de élite.
                </p>

                <div className="flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <Link to="auth/login" className="group relative px-8 py-4 bg-[#BF953F] text-black font-bold uppercase tracking-widest overflow-hidden rounded-sm hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center gap-3">
                            RESERVAR CITA <Calendar size={18} />
                        </span>
                    </Link>
                </div>

                {/* About Section */}
                <section id="sobre-nosotros" className="w-full mt-32 scroll-mt-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="aspect-square bg-neutral-900 border border-white/5 rounded-sm p-4 rotate-3">
                            <img src={teamImage} alt="Equipo Zero Vanity" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left">
                            <h2 className="font-heading text-4xl text-[#FCF6BA] mb-6">Sobre Nosotros</h2>
                            <p className="text-neutral-400 leading-relaxed mb-6">
                                En Zero Vanity, fusionamos la tradición de la alta peluquería con las técnicas estéticas más vanguardistas.
                                Nuestro equipo de estilistas expertos está dedicado a esculpir tu mejor versión en un ambiente de lujo y relajación.
                            </p>
                            <p className="text-neutral-400 leading-relaxed">
                                Cada visita es un ritual de belleza personalizado, donde tu satisfacción es nuestra única prioridad.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Grid (Servicios destacados) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full text-left">
                    <FeatureCard
                        icon={<Scissors className="text-[#BF953F]" />}
                        title="Estilismo de Vanguardia"
                        desc="Nuestros directores creativos diseñarán el corte y color perfecto que realce tus facciones y personalidad única."
                        delay={400}
                    />
                    <FeatureCard
                        icon={<Sparkles className="text-[#BF953F]" />}
                        title="Rituales de Bienestar"
                        desc="Sumérgete en una experiencia sensorial con productos orgánicos de primera línea y técnicas de relajación profunda."
                        delay={500}
                    />
                    <FeatureCard
                        icon={<Star className="text-[#BF953F]" />}
                        title="Experiencia VIP"
                        desc="Disfruta de un ambiente privado y sofisticado, donde cada detalle está pensado para tu máxima satisfacción."
                        delay={600}
                    />
                </div>

                {/* Services Section */}
                <section id="servicios" className="w-full mt-40 scroll-mt-32">
                    <div className="flex flex-col items-center mb-16 px-4">
                        <h2 className="font-heading text-4xl md:text-5xl text-[#FCF6BA] mb-6 text-center">Nuestros Servicios</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#BF953F] to-transparent" />
                        <p className="mt-6 text-neutral-400 max-w-2xl text-center font-light">
                            Descubre nuestra carta de tratamientos exclusivos, diseñados para realzar tu belleza natural con productos de primera línea.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        {SERVICES.map((service, index) => (
                            <ServiceCard key={service.title} {...service} delay={index * 100} />
                        ))}
                    </div>
                </section>

                {/* Gallery Section */}
                <section id="galería" className="w-full mt-40 scroll-mt-32">
                    <h2 className="font-heading text-4xl text-[#FCF6BA] mb-12 text-center">Galería</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="aspect-square bg-neutral-900 border border-white/5 hover:border-[#BF953F]/50 transition-colors">
                            <img src={galleryLook1} alt="Novia Romántica" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="aspect-square bg-neutral-900 border border-white/5 hover:border-[#BF953F]/50 transition-colors">
                            <img src={galleryLook2} alt="Look Editorial" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="aspect-square bg-neutral-900 border border-white/5 hover:border-[#BF953F]/50 transition-colors">
                            <img src={galleryLook3} alt="Look Casual Waves" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="aspect-square bg-neutral-900 border border-white/5 hover:border-[#BF953F]/50 transition-colors">
                            <img src={galleryLook4} alt="Look Casual Bob" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </section>

                {/* Blog Section */}
                <section id="blog" className="w-full mt-40 scroll-mt-32">
                    <h2 className="font-heading text-4xl text-[#FCF6BA] mb-12 text-center">Últimas Novedades</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="border border-white/5 bg-background p-6">
                                <div className="aspect-video bg-neutral-900 mb-4">
                                    <img src={`https://placehold.co/600x400/1a1a1a/BF953F?text=Articulo+${i}`} alt="Blog" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-[#BF953F] text-xs uppercase tracking-widest">Tendencias</span>
                                <h3 className="font-heading text-xl text-white mt-2 mb-2">Secretos de Belleza {2026}</h3>
                                <p className="text-neutral-500 text-sm">Descubre los tratamientos que marcarán la temporada...</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faqs" className="w-full mt-40 scroll-mt-32 max-w-3xl mx-auto">
                    <h2 className="font-heading text-4xl text-[#FCF6BA] mb-12 text-center">Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        <div className="border border-white/5 p-6 bg-white/[0.02]">
                            <h3 className="text-[#FCF6BA] font-heading text-lg mb-2">¿Necesito cita previa?</h3>
                            <p className="text-neutral-400">Sí, recomendamos reservar para garantizar la mejor atención.</p>
                        </div>
                        <div className="border border-white/5 p-6 bg-white/[0.02]">
                            <h3 className="text-[#FCF6BA] font-heading text-lg mb-2">¿Qué marcas utilizáis?</h3>
                            <p className="text-neutral-400">Trabajamos exclusivamente con productos de gama alta y orgánicos.</p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contacto" className="w-full mt-40 scroll-mt-32 mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/[0.02] border border-white/5 p-8 md:p-12">
                        <div>
                            <h2 className="font-heading text-4xl text-[#FCF6BA] mb-6">Contacto</h2>
                            <p className="text-neutral-400 mb-8">Estamos aquí para asesorarte. Visítanos o contáctanos.</p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 border border-[#BF953F] flex items-center justify-center">
                                        <Calendar size={18} className="text-[#BF953F]" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-[#BF953F]">Horario</p>
                                        <p className="text-white">Lun - Sab: 10:00 - 20:00</p>
                                    </div>
                                </div>
                                {/* Add more contact info here */}
                            </div>
                        </div>
                        <div className="bg-neutral-900 border border-white/10 h-64 md:h-auto flex items-center justify-center">
                            <span className="text-neutral-500 uppercase tracking-widest text-sm">[Mapa Ubicación]</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="relative z-10 w-full border-t border-white/5 mt-32 py-8 text-center">
                <p className="text-neutral-600 text-xs uppercase tracking-widest">© 2026 Zero Salon. The Art of Coding.</p>
            </footer>
        </div>
    )
}

function FeatureCard({ icon, title, desc, delay }: Readonly<{ icon: any, title: string, desc: string, delay: number }>) {
    return (
        <div className={`p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-backwards`} style={{ animationDelay: `${delay}ms` }}>
            <div className="mb-4">{icon}</div>
            <h3 className="font-heading text-xl text-[#FCF6BA] mb-2">{title}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}

function ServiceCard({ title, desc, image, delay }: Readonly<{ title: string, desc: string, image: string, delay: number }>) {
    return (
        <div
            className="group relative overflow-hidden rounded-sm border border-white/5 bg-background hover:border-[#BF953F]/30 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
            </div>
            <div className="p-6 relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#BF953F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="font-heading text-xl text-[#FCF6BA] mb-3 group-hover:text-[#BF953F] transition-colors">{title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-light">{desc}</p>
            </div>
        </div>
    )
}

const SERVICES = [
    {
        title: "Corte de Pelo Mujer",
        desc: "Estudio visajístico y corte personalizado adaptado a tus facciones.",
        image: serviceHaircut
    },
    {
        title: "Tinte Premium",
        desc: "Coloración de alta gama que aporta brillo, cobertura y nutrición profunda.",
        image: serviceColor
    },
    {
        title: "Mechas Balayage",
        desc: "Técnica a mano alzada para un degradado natural y luminoso efecto 'sun-kissed'.",
        image: serviceBalayage
    },
    {
        title: "Tratamiento Capilar",
        desc: "Rituales de hidratación y reconstrucción para recuperar la salud de tu fibra capilar.",
        image: serviceTreatment
    },
    {
        title: "Keratina",
        desc: "Alisado y eliminación del encrespamiento para un cabello manejable y sedoso.",
        image: serviceKeratin
    },
    {
        title: "Extensiones",
        desc: "Volumen y longitud con sistemas de integración natural de máxima calidad.",
        image: serviceExtensions
    },
    {
        title: "Pelo Postizo",
        desc: "Soluciones estéticas personalizadas para necesidades específicas de densidad.",
        image: servicePostizo
    },
    {
        title: "Rastas",
        desc: "Creación y mantenimiento de rastas con técnicas que cuidan tu raíz.",
        image: serviceRastas
    },
    {
        title: "Alisado Permanente",
        desc: "Transformación de la estructura del cabello para un liso perfecto y duradero.",
        image: serviceAlisado
    },
    {
        title: "Trenzas",
        desc: "Diseños trenzados artísticos, desde estilos clásicos hasta vanguardistas.",
        image: serviceTrenzas
    },
    {
        title: "Asesoría de Imagen",
        desc: "Consultoría integral para encontrar el estilo que mejor proyecta tu personalidad.",
        image: serviceAsesoria
    },
    {
        title: "Maquillaje Profesional",
        desc: "Para eventos, novias o social. Resaltamos tu belleza con productos HD.",
        image: serviceMaquillaje
    },
    {
        title: "Manicura Spa",
        desc: "Cuidado completo de manos y uñas con esmaltados de larga duración.",
        image: serviceManicura
    },
    {
        title: "Pedicura",
        desc: "Experiencia relajante y estética para unos pies sanos y bellos.",
        image: servicePedicura
    },
    {
        title: "Depilación",
        desc: "Técnicas suaves y efectivas para una piel perfecta y libre de vello.",
        image: serviceDepilacion
    }
];
