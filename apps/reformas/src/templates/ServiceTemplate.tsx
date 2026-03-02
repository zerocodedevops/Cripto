import { RootLayout } from "../core/layout/RootLayout";
import { SchemaFAQ } from "../core/seo/SchemaFAQ";
import { CTAButton } from "../core/components/CTAButton";
import { FAQSection } from "../core/components/FAQSection";
import { config } from "../clients/madrid-zerochaos/config";
import type { ServiceConfig } from "../core/types";

interface ServiceTemplateProps {
    service: ServiceConfig;
}

export const ServiceTemplate = ({ service }: ServiceTemplateProps) => {
    return (
        <RootLayout>
            <SchemaFAQ faqs={service.faqs} />

            {/* Hero Servicio */}
            <section className="relative pt-40 pb-24 bg-[#1C1C1E] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    {/* Pattern placeholder */}
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
                        {service.name} <span className="text-[#D4A853]">Madrid</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {service.shortDescription}
                    </p>
                    <div className="flex justify-center">
                        <CTAButton text="Pide Presupuesto Gratis" href="/contacto" />
                    </div>
                </div>
            </section>

            {/* Contenido SEO Extenso */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 prose prose-lg max-w-none text-gray-600">
                        <h2 className="text-3xl font-black text-[#1C1C1E] uppercase mb-8">Especialistas en {service.name}</h2>
                        <div className="leading-relaxed space-y-6">
                            <p>{service.fullContent}</p>
                            <p>Nuestra metodología de trabajo se basa en la transparencia absoluta. En Madrid, el mercado de las reformas suele ser caótico: retrasos, materiales que no llegan o facturas que suben sin previo aviso. En <strong>{config.name}</strong> hemos eliminado estas variables mediante un contrato blindado y una planificación técnica previa que no deja nada al azar.</p>

                            <h3 className="text-2xl font-bold text-[#1C1C1E] mt-12 mb-6">¿Por qué elegir nuestra reforma de {service.name.toLowerCase()}?</h3>
                            <ul className="list-none space-y-4">
                                <li className="flex items-start">
                                    <span className="text-[#D4A853] mr-3">✔</span> <strong>Presupuesto Cerrado:</strong> No hay variaciones de precio una vez firmado el contrato.
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#D4A853] mr-3">✔</span> <strong>Plazos Garantizados:</strong> Penalizaciones por retraso a nuestro cargo.
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#D4A853] mr-3">✔</span> <strong>Jefe de Obra Dedicado:</strong> Un único interlocutor para toda tu reforma.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <aside className="lg:col-span-1">
                        <div className="bg-[#F5F5F0] p-8 border-t-4 border-[#D4A853] sticky top-32">
                            <h4 className="text-lg font-bold text-[#1C1C1E] uppercase mb-6 tracking-tight">Precio Orientativo</h4>
                            <div className="mb-8">
                                <span className="text-4xl font-black text-[#D4A853]">{service.priceFrom}</span>
                                <p className="text-xs text-gray-400 mt-2 italic">* Precio base sujeto a metros y materiales.</p>
                            </div>
                            <ul className="space-y-4 text-sm text-gray-600 mb-8 border-y border-gray-200 py-6">
                                <li>Visitamos tu vivienda</li>
                                <li>Presupuesto en 24h/48h</li>
                                <li>Garantía de 10 años</li>
                            </ul>
                            <CTAButton text="Solicitar Visita" href="/contacto" className="w-full" />
                        </div>
                    </aside>
                </div>
            </section>

            {/* Precios y Otros */}
            {service.faqs.length > 0 && (
                <section className="py-24 bg-[#F5F5F0]">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-black text-[#1C1C1E] uppercase text-center mb-16 underline decoration-[#D4A853] decoration-8 underline-offset-[-2px]">Preguntas Frecuentes</h2>
                        <FAQSection items={service.faqs} />
                    </div>
                </section>
            )}
        </RootLayout>
    );
};
