/* eslint-disable @typescript-eslint/no-deprecated */
import { motion } from 'framer-motion';
// eslint-disable-next-line
import { Github, Linkedin, Mail, ArrowDown, Sparkles, Bot } from 'lucide-react';
import { Button } from '@/components/ui';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

const socialLinks = [
  // eslint-disable-next-line
  { icon: Github, href: 'https://github.com/zerocodedevops', label: 'GitHub', color: 'hover:text-white' },
  // eslint-disable-next-line
  { icon: Linkedin, href: 'https://www.linkedin.com/in/zerocode-devops', label: 'LinkedIn', color: 'hover:text-blue-400' },
  { icon: Mail, href: 'mailto:zerocode.devops@gmail.com', label: 'Email', color: 'hover:text-primary-400' },
];

export function Hero() {
  const { t } = useTranslation();
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="flex items-start justify-center pt-20 md:pt-28 pb-16 lg:pb-24 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float animation-delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary-500/5 to-transparent rounded-full" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              {t('hero.available', 'Disponible para nuevos proyectos')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className="heading-1 text-dark-100 mb-6"
          >
            {t('hero.greeting')}{' '}
            <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
              {t('hero.name')}
            </span>
          </motion.h1>

          {/* Subtitle - Updated to reflect AI-assisted development */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-2 text-xl md:text-2xl text-dark-400 mb-4"
          >
            <span>{t('hero.role', 'Desarrollador Autodidacta')}</span>
            <span className="text-dark-600">|</span>
            <span className="inline-flex items-center gap-2 text-accent-400">
              <Bot className="w-5 h-5" />
              {t('hero.aiPowered', 'Potenciado por IA')}
            </span>
          </motion.div>

          {/* Description - Updated to be authentic */}
          <motion.p
            variants={fadeInUp}
            className="text-lg text-dark-500 max-w-2xl mx-auto mb-8"
          >
            {t('hero.description1', 'Sin formación tradicional, pero con pasión infinita.')}
            <br/>
            {t('hero.description2', 'Construyo proyectos reales con la IA como mi aliada.')}
            <br/>
            <span className="text-primary-400">{t('hero.description3', 'Me involucro al 200% en cada proyecto.')}</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <Button
              variant="primary"
              size="lg"
              rightIcon={<Mail className="w-5 h-5" />}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta.contact', 'Contáctame')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              /* eslint-disable-next-line @typescript-eslint/no-deprecated */
              rightIcon={<Github className="w-5 h-5" />}
              onClick={() => window.open('https://github.com/zerocodedevops', '_blank')}
            >
              {t('hero.cta.github', 'Ver GitHub')}
            </Button>

          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-4"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl bg-dark-800/50 border border-dark-700/50 text-dark-400 ${social.color} transition-all duration-300 hover:border-primary-500/50 hover:shadow-glow`}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>


      </div>
    </section>
  );
}
