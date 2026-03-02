import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CTAButton } from "../components/CTAButton";

interface HeaderProps {
    clientName: string;
}

export const Header = ({ clientName: _clientName }: HeaderProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Integrales", href: "/proyectos/reformas/reformas-integrales-madrid" },
        { name: "Cocinas", href: "/proyectos/reformas/reformas-cocinas-madrid" },
        { name: "Baños", href: "/proyectos/reformas/reformas-banos-madrid" },
        { name: "Proyectos", href: "/proyectos/reformas/proyectos" },
        { name: "Sobre Nosotros", href: "/proyectos/reformas/sobre-nosotros" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 group">
                    <span className={`text-2xl font-black uppercase tracking-tighter transition-colors ${isScrolled ? "text-[#1C1C1E]" : "text-white"
                        }`}>
                        {_clientName.split(' ')[0]} <span className="text-[#D4A853]">{_clientName.split(' ')[1]}</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`text-sm font-semibold uppercase tracking-widest hover:text-[#D4A853] transition-colors ${isScrolled ? "text-[#1C1C1E]" : "text-white"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <CTAButton text="Pide Presupuesto" href="/contacto" variant="primary" className="py-2 px-6" />
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg className={`w-8 h-8 ${isScrolled ? 'text-[#1C1C1E]' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-[#1C1C1E] z-50 transition-transform duration-500 lg:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}>
                <div className="flex flex-col h-full p-8">
                    <div className="flex justify-between items-center mb-12">
                        <span className="text-2xl font-black text-white uppercase tracking-tighter">
                            {_clientName.split(' ')[0]} <span className="text-[#D4A853]">{_clientName.split(' ')[1]}</span>
                        </span>
                        <button onClick={() => setMobileMenuOpen(false)}>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex flex-col space-y-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-white uppercase tracking-wider border-b border-white/10 pb-4"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <CTAButton
                            text="Pide Presupuesto"
                            href="/contacto"
                            className="mt-4"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                    </nav>
                </div>
            </div>
        </header>
    );
};
