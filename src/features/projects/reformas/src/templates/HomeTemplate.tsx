import { Link } from "react-router-dom";
import { RootLayout } from "../core/layout/RootLayout";
import { SchemaLocalBusiness } from "../core/seo/SchemaLocalBusiness";
import { CTAButton } from "../core/components/CTAButton";
import { ProcessSteps } from "../core/components/ProcessSteps";
import { ContactForm } from "../core/components/ContactForm";
import { config } from "../clients/madrid-zerochaos/config";
import { servicios } from "../clients/madrid-zerochaos/servicios";

export const HomeTemplate = () => {
    return (
        <RootLayout>
            <SchemaLocalBusiness
                name={config.name}
                description={config.seo.mainDescription}
                address={config.contact.address}
                phone={config.contact.phone}
                email={config.contact.email}
                url={`https://${config.domain}`}
                logo={`https://${config.domain}/logo.png`}
                image={`https://${config.domain}/hero-bg.jpg`}
                city={config.contact.city}
            />

            {/* Hero Section */}
            <section className="relative h-screen min-h-[700px] flex items-center bg-[#1C1C1E] overflow-hidden">
                {/* Abstract background elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#D4A853]/5 -skew-x-12 translate-x-1/4" />

                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 pt-20">
                    <div className="flex flex-col justify-center animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight uppercase tracking-tighter mb-6">
                            Reformas integrales <br />
                            <span className="text-[#D4A853]">sin el caos</span> de siempre.
                        </h1>
                        <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
                            Especialistas en Madrid. Presupuesto cerrado por contrato y gestión técnica impecable. Convertimos tu obra en una inversión, no en un problema.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                            <CTAButton text="Pide Presupuesto real" href="/proyectos/reformas/contacto" variant="primary" />
                            <CTAButton text="Ver Proyectos" href="/proyectos/reformas/proyectos" variant="outline" />
                        </div>

                        <div className="mt-16 flex items-center space-x-8">
                            <div>
                                <span className="block text-3xl font-bold text-white uppercase">+250</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Proyectos realizados</span>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div>
                                <span className="block text-3xl font-bold text-white uppercase">10Añ</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Garantía por escrito</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex justify-end items-center">
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* Social Proof / Trust Bar */}
            <section className="bg-white py-12 border-b border-gray-100">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">Confianza asegurada por contrato</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Trust badges placeholders */}
                        <span className="text-xl font-bold text-gray-800 uppercase tracking-tighter">Certificado Calidad</span>
                        <span className="text-xl font-bold text-gray-800 uppercase tracking-tighter">Seguro RC 1M€</span>
                        <span className="text-xl font-bold text-gray-800 uppercase tracking-tighter">Planificación 3D</span>
                        <span className="text-xl font-bold text-gray-800 uppercase tracking-tighter">Presupuesto Cerrado</span>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 bg-[#F5F5F0]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1E] uppercase tracking-tighter mb-4">
                            Nuestros <span className="text-[#D4A853]">Servicios</span>
                        </h2>
                        <div className="w-20 h-1 bg-[#D4A853] mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {servicios.map((servicio) => (
                            <div key={servicio.id} className="group bg-white p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border-b-4 border-transparent hover:border-[#D4A853]">
                                <h3 className="text-2xl font-bold text-[#1C1C1E] mb-4 uppercase tracking-tight">{servicio.name}</h3>
                                <p className="text-gray-500 mb-8 leading-relaxed">{servicio.shortDescription}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{servicio.priceFrom}</span>
                                    <Link to={`/proyectos/reformas/${servicio.slug}`} className="text-[#D4A853] font-bold uppercase text-sm tracking-widest group-hover:translate-x-2 transition-transform">Ver más →</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Proceso Step by Step */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <div className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1E] uppercase tracking-tighter mb-4">
                            El proceso <span className="text-[#D4A853]">Zero Chaos</span>
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Eliminamos la incertidumbre de tu reforma con un sistema probado en más de 250 viviendas.
                        </p>
                    </div>
                    <ProcessSteps />
                    <div className="mt-16">
                        <CTAButton text="Descarga nuestra guía de proceso" href="/proyectos/reformas/contacto" variant="outline" />
                    </div>
                </div>
            </section>
        </RootLayout>
    );
};
