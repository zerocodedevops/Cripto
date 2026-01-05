import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// eslint-disable-next-line @typescript-eslint/no-deprecated
import { Menu, X, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

import { trackEvent } from '@/lib/analytics';

const socialLinks = [
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  { icon: Github, href: 'https://github.com/zerocodedevops', label: 'GitHub' },
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  { icon: Linkedin, href: 'https://www.linkedin.com/in/zerocode-devops', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:zerocode.devops@gmail.com', label: 'Email' },
];

export function Navbar() {
  const { i18n, t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(() => {
    // Check localStorage or default to dark
    const saved = localStorage.getItem('theme');
    return saved === 'light';
  });

  const navLinks = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.blog'), href: '#blog' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isLightMode) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-dark-900/80 backdrop-blur-xl border-b border-dark-700/50 py-3'
          : 'bg-transparent py-5'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
          >
            &lt;ZeroCode_Portfolio /&gt;
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-dark-300 hover:text-primary-400 transition-colors text-sm font-medium"
                whileHover={{ y: -2 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-dark-400 hover:text-primary-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  onClick={() => trackEvent('Social', `click_${social.label.toLowerCase()}`, 'navbar')}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Theme toggle */}
            <motion.button
              onClick={() => {
                const newTheme = !isLightMode ? 'light' : 'dark';
                toggleTheme();
                trackEvent('UI', 'toggle_theme', newTheme);
              }}
              className="p-2 text-dark-400 hover:text-primary-400 transition-colors rounded-lg hover:bg-dark-800/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isLightMode ? 'Activar modo oscuro' : 'Activar modo claro'}
              title={isLightMode ? 'Modo Oscuro' : 'Modo Claro'}
            >
              {isLightMode ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.button>

            {/* Language switcher */}
            <div className="flex items-center gap-1 border border-dark-700 rounded-lg p-1">
              <motion.button
                onClick={() => {
                  i18n.changeLanguage('es');
                  trackEvent('UI', 'change_language', 'es');
                }}
                className={cn(
                  "px-2 py-1 text-xs font-medium rounded transition-colors",
                  i18n.language === 'es'
                    ? "bg-primary-600 text-white"
                    : "text-dark-400 hover:text-primary-400"
                )}
                whileTap={{ scale: 0.95 }}
                aria-label="Cambiar a Español"
              >
                ES
              </motion.button>
              <motion.button
                onClick={() => {
                  i18n.changeLanguage('en');
                  trackEvent('UI', 'change_language', 'en');
                }}
                className={cn(
                  "px-2 py-1 text-xs font-medium rounded transition-colors",
                  i18n.language === 'en'
                    ? "bg-primary-600 text-white"
                    : "text-dark-400 hover:text-primary-400"
                )}
                whileTap={{ scale: 0.95 }}
                aria-label="Switch to English"
              >
                EN
              </motion.button>
            </div>

          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 text-dark-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-dark-900/95 backdrop-blur-xl border-b border-dark-700/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-custom py-6 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-dark-200 hover:text-primary-400 transition-colors text-lg font-medium py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              
              <div className="flex items-center gap-4 pt-4 border-t border-dark-700/50">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-dark-400 hover:text-primary-400 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
