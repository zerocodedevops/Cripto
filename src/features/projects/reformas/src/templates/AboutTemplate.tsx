import { RootLayout } from "../core/layout/RootLayout";
import { CTAButton } from "../core/components/CTAButton";
import { config } from "../clients/madrid-zerochaos/config";

export const AboutTemplate = () => {
    return (
        <RootLayout>
            <section className="pt-40 pb-20 bg-[#1C1C1E]">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8">
                        Nuestra <span className="text-[#D4A853]">Historia</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Nacimos con un objetivo claro: reformar viviendas sin los problemas de siempre. En Zero Chaos, el orden no es negociable.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="text-gray-600 space-y-6 leading-relaxed">
                        <h2 className="text-4xl font-black text-[#1C1C1E] uppercase tracking-tighter mb-6">¿Por qué <span className="text-[#D4A853]">Zero Chaos</span>?</h2>
                        <p>Fundamos esta empresa tras ver cientos de propietarios frustrados por los mismos errores sistemáticos en el sector de las reformas: presupuestos que crecen sin control, operarios que no aparecen y acabados que no cumplen con lo prometido.</p>
                        <p>Decidimos aplicar principios de ingeniería y gestión de proyectos industrial a la reforma de viviendas. El resultado es un sistema predecible donde el cliente sabe en todo momento lo que está pagando y cuándo terminará su obra.</p>
                        <p>En **{config.name}**, no solo renovamos espacios; renovamos la confianza en el sector de la construcción.</p>
                        <div className="pt-6">
                            <CTAButton text="Conoce nuestro proceso" href="/" variant="outline" />
                        </div>
                    </div>
                    <div className="bg-[#F5F5F0] p-12 order-first lg:order-last">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <span className="block text-4xl font-black text-[#1C1C1E] uppercase mb-2">+250</span>
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Viviendas <br />transformadas</p>
                            </div>
                            <div>
                                <span className="block text-4xl font-black text-[#1C1C1E] uppercase mb-2">10Añ</span>
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Garantía <br />total</p>
                            </div>
                            <div>
                                <span className="block text-4xl font-black text-[#1C1C1E] uppercase mb-2">100%</span>
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Presupuesto <br />blindado</p>
                            </div>
                            <div>
                                <span className="block text-4xl font-black text-[#1C1C1E] uppercase mb-2">24h</span>
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Respuesta <br />asegurada</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </RootLayout>
    );
};
