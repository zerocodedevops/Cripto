import { RootLayout } from "../core/layout/RootLayout";
import { CTAButton } from "../core/components/CTAButton";

export const ProjectsTemplate = () => {
    return (
        <RootLayout>
            <section className="pt-40 pb-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-[#1C1C1E] uppercase tracking-tighter mb-8">
                        Nuestros <span className="text-[#D4A853]">Proyectos</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-16 leading-relaxed">
                        Nada habla mejor de nosotros que los resultados reales. Aquí puedes ver una selección de reformas integrales realizadas en la Comunidad de Madrid.
                    </p>
                </div>
            </section>

            <section className="pb-24 bg-white">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Loop through projects from clients/data would go here */}
                    <div className="group overflow-hidden bg-[#F5F5F0]">
                        <div className="aspect-video bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#1C1C1E]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold uppercase tracking-widest">Ver detalle</div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold text-[#1C1C1E] uppercase mb-2">Reforma Integral Bº Salamanca</h3>
                            <p className="text-sm text-gray-500 leading-relaxed mb-6">Redistribución completa de vivienda de 120m², recuperación de molduras originales y climatización invisible.</p>
                            <div className="flex space-x-2">
                                <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 uppercase tracking-widest text-[#D4A853]">Integral</span>
                                <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 uppercase tracking-widest text-gray-400">Madrid Centro</span>
                            </div>
                        </div>
                    </div>

                    <div className="group overflow-hidden bg-[#F5F5F0]">
                        <div className="aspect-video bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#1C1C1E]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold uppercase tracking-widest">Ver detalle</div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold text-[#1C1C1E] uppercase mb-2">Cocina de Diseño en Pozuelo</h3>
                            <p className="text-sm text-gray-500 leading-relaxed mb-6">Mobiliario minimalista con isla central en Neolith y electrodomésticos integrados de alta gama.</p>
                            <div className="flex space-x-2">
                                <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 uppercase tracking-widest text-[#D4A853]">Cocina</span>
                                <span className="text-[10px] bg-white border border-gray-200 px-2 py-1 uppercase tracking-widest text-gray-400">Pozuelo</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 text-center mt-20">
                    <CTAButton text="Tu reforma puede ser la siguiente" href="/contacto" />
                </div>
            </section>
        </RootLayout>
    );
};
