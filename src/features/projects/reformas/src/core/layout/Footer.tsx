import { Link } from "react-router-dom";

interface FooterProps {
    clientName: string;
    phone: string;
    address: string;
    email: string;
}

export const Footer = ({ clientName, phone, address, email }: FooterProps) => {
    return (
        <footer className="bg-[#1C1C1E] text-white pt-20 pb-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">
                {/* Brand Info */}
                <div>
                    <span className="text-2xl font-black uppercase tracking-tighter mb-6 block">
                        ZERO <span className="text-[#D4A853]">CHAOS</span>
                    </span>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Especialistas en reformas integrales en Madrid. Unimos arquitectura, técnica y gestión para eliminar el caos de tu obra.
                    </p>
                    <div className="flex space-x-4">
                        {/* Social icons placeholders */}
                    </div>
                </div>

                {/* Services */}
                <div>
                    <h4 className="text-lg font-bold uppercase mb-6 tracking-wide">Servicios</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link to="/proyectos/reformas/reformas-integrales-madrid" className="hover:text-[#D4A853]">Reformas Integrales</Link></li>
                        <li><Link to="/proyectos/reformas/reformas-cocinas-madrid" className="hover:text-[#D4A853]">Reformas de Cocinas</Link></li>
                        <li><Link to="/proyectos/reformas/reformas-banos-madrid" className="hover:text-[#D4A853]">Reformas de Baños</Link></li>
                        <li><Link to="/proyectos/reformas/proyectos" className="hover:text-[#D4A853]">Proyectos Antes/Después</Link></li>
                    </ul>
                </div>

                {/* Zones */}
                <div>
                    <h4 className="text-lg font-bold uppercase mb-6 tracking-wide">Zonas</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link to="/proyectos/reformas/reformas-madrid/salamanca" className="hover:text-[#D4A853]">Bº Salamanca</Link></li>
                        <li><Link to="/proyectos/reformas/reformas-madrid/chamberi" className="hover:text-[#D4A853]">Chamberí</Link></li>
                        <li><Link to="/proyectos/reformas/reformas-madrid/pozuelo" className="hover:text-[#D4A853]">Pozuelo de Alarcón</Link></li>
                        <li><Link to="/proyectos/reformas/reformas-madrid/majadahonda" className="hover:text-[#D4A853]">Majadahonda</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-bold uppercase mb-6 tracking-wide">Contacto</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex items-start">
                            <span className="text-[#D4A853] mr-3 font-bold">T:</span>
                            <a href={`tel:${phone.replaceAll(" ", "")}`} className="hover:text-[#D4A853]">{phone}</a>
                        </li>
                        <li className="flex items-start">
                            <span className="text-[#D4A853] mr-3 font-bold">E:</span>
                            <a href={`mailto:${email}`} className="hover:text-[#D4A853]">{email}</a>
                        </li>
                        <li className="flex items-start">
                            <span className="text-[#D4A853] mr-3 font-bold">D:</span>
                            <span>{address}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-6 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
                <p>© {new Date().getFullYear()} {clientName} — Todos los derechos reservados.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link to="/aviso-legal" className="hover:text-white">Aviso Legal</Link>
                    <Link to="/privacidad" className="hover:text-white">Privacidad</Link>
                    <Link to="/cookies" className="hover:text-white">Cookies</Link>
                </div>
            </div>
        </footer>
    );
};
