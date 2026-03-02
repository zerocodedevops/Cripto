import { RootLayout } from "../core/layout/RootLayout";
import { ContactForm } from "../core/components/ContactForm";
import { config } from "../clients/madrid-zerochaos/config";

export const ContactTemplate = () => {
    return (
        <RootLayout>
            <section className="pt-40 pb-24 bg-[#F5F5F0]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-black text-[#1C1C1E] uppercase tracking-tighter mb-8 max-w-xl">
                                Hablemos de tu <span className="text-[#D4A853]">proyecto.</span>
                            </h1>
                            <p className="text-lg text-gray-500 mb-12 leading-relaxed max-w-lg">
                                Estamos listos para eliminar el caos de tu futura reforma. Rellena el formulario o llámanos directamente para agendar una visita técnica gratuita.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-center space-x-6">
                                    <div className="w-12 h-12 bg-[#1C1C1E] text-[#D4A853] flex items-center justify-center rounded-sm font-bold">T</div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Teléfono</p>
                                        <a href={`tel:${config.contact.phone.replaceAll(" ", "")}`} className="text-xl font-bold text-[#1C1C1E] hover:text-[#D4A853] transition-colors">{config.contact.phone}</a>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="w-12 h-12 bg-[#1C1C1E] text-[#D4A853] flex items-center justify-center rounded-sm font-bold">E</div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Email</p>
                                        <a href={`mailto:${config.contact.email}`} className="text-xl font-bold text-[#1C1C1E] hover:text-[#D4A853] transition-colors">{config.contact.email}</a>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <div className="w-12 h-12 bg-[#1C1C1E] text-[#D4A853] flex items-center justify-center rounded-sm font-bold">D</div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Oficina en Madrid</p>
                                        <p className="text-lg font-bold text-[#1C1C1E]">{config.contact.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center lg:justify-end">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Maps placeholder could go here */}
        </RootLayout>
    );
};
