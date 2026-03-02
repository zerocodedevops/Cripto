import { RootLayout } from "../core/layout/RootLayout";
import { CTAButton } from "../core/components/CTAButton";
import { config } from "../clients/madrid-zerochaos/config";
import type { BarrioConfig } from "../core/types";

interface BarrioTemplateProps {
    barrio: BarrioConfig;
}

export const BarrioTemplate = ({ barrio }: BarrioTemplateProps) => {
    return (
        <RootLayout>
            {/* Hero Barrio */}
            <section className="relative pt-40 pb-20 bg-[#F5F5F0] overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                    <span className="text-sm font-bold text-[#D4A853] uppercase tracking-[0.4em] mb-4">Empresa de Reformas Local</span>
                    <h1 className="text-5xl md:text-7xl font-black text-[#1C1C1E] uppercase tracking-tighter mb-8 max-w-4xl">
                        Reformamos tu vivienda en <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C1C1E] to-[#D4A853]">{barrio.name}</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mb-10 leading-relaxed">
                        {barrio.description} Conocemos perfectamente la normativa del {barrio.name} para agilizar licencias y permisos.
                    </p>
                    <CTAButton text="Pide Presupuesto en 24h" href="/proyectos/reformas/contacto" />
                </div>
            </section>

            {/* Contenido Barrio */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-black text-[#1C1C1E] uppercase tracking-tighter mb-6">Expertos en Viviendas de {barrio.name}</h2>
                        <div className="text-gray-600 leading-relaxed space-y-4">
                            <p>Realizar una reforma en el **{barrio.name}** requiere de un equipo técnico que comprenda el valor de la propiedad y las particularidades de la zona. Ya sea un piso clásico de techos altos o un apartamento moderno, en **{config.name}** aplicamos nuestra metodología "Zero Chaos" para asegurar una ejecución impecable.</p>
                            <p>Nuestra propuesta es simple: te entregamos una vivienda renovada con los más altos estándares de calidad, sin que tengas que sufrir el estrés habitual de una obra.</p>
                        </div>
                    </div>
                    <div className="bg-[#1C1C1E] p-10 text-white">
                        <h3 className="text-2xl font-bold uppercase mb-6 tracking-tight text-[#D4A853]">Ventajas en {barrio.name}</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start">
                                <div className="w-8 h-8 rounded-full border border-[#D4A853] flex items-center justify-center mr-4 flex-shrink-0 text-xs font-bold">01</div>
                                <p className="text-sm leading-relaxed"><span className="font-bold block text-white">Gestión local de residuos y licencias:</span> Tramitamos todo con el Ayuntamiento de Madrid sección {barrio.name}.</p>
                            </li>
                            <li className="flex items-start">
                                <div className="w-8 h-8 rounded-full border border-[#D4A853] flex items-center justify-center mr-4 flex-shrink-0 text-xs font-bold">02</div>
                                <p className="text-sm leading-relaxed"><span className="font-bold block text-white">Logística optimizada:</span> Al trabajar frecuentemente en la zona, conocemos los accesos y restricciones de carga/descarga.</p>
                            </li>
                            <li className="flex items-start">
                                <div className="w-8 h-8 rounded-full border border-[#D4A853] flex items-center justify-center mr-4 flex-shrink-0 text-xs font-bold">03</div>
                                <p className="text-sm leading-relaxed"><span className="font-bold block text-white">Referencias reales:</span> Hemos realizado proyectos similares muy cerca de tu ubicación actual.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Testimonios Teaser etc */}
        </RootLayout>
    );
};
