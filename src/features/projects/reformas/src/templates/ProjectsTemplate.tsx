import { RootLayout } from "../core/layout/RootLayout";
import { proyectos } from "../clients/madrid-zerochaos/proyectos";
import { CTAButton } from "../core/components/CTAButton";

export const ProjectsTemplate = () => {
    return (
        <RootLayout>
            <section className="pt-40 pb-20 bg-[#1C1C1E]">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
                        Proyectos <span className="text-[#D4A853]">Completados</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        La mejor garantía es nuestro trabajo. Estos son algunos resultados del método Zero Chaos en viviendas de Madrid.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="space-y-32">
                        {proyectos.map((project, index) => (
                            <div key={project.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-bold text-[#D4A853] uppercase tracking-widest">{project.location}</span>
                                        <div className="h-px flex-1 bg-gray-100" />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1E] uppercase tracking-tighter leading-none">
                                        {project.title}
                                    </h2>
                                    <p className="text-xl text-gray-500 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="bg-[#F5F5F0] p-8 border-l-4 border-[#D4A853]">
                                        <h3 className="text-lg font-bold text-[#1C1C1E] uppercase mb-4 tracking-tight">Trabajos Realizados:</h3>
                                        <ul className="space-y-3">
                                            {project.details.map((detail, dIndex) => (
                                                <li key={dIndex} className="flex items-start">
                                                    <span className="text-[#D4A853] mr-3">✔</span>
                                                    <span className="text-gray-600 text-sm">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-bold uppercase tracking-widest border border-gray-200 px-3 py-1 text-gray-400">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <CTAButton text="Quiero algo así" href="/proyectos/reformas/contacto" />
                                </div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Antes</span>
                                            <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                                                <img src={project.beforeImage} alt="Antes" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black uppercase text-[#D4A853] tracking-widest">Después</span>
                                            <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                                                <img src={project.afterImage} alt="Después" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </RootLayout>
    );
};
