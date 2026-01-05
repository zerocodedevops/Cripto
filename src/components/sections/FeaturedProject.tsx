/* eslint-disable @typescript-eslint/no-deprecated */
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, Users, FileCode, GitCommit, Github as GithubIcon } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { Button, TechBadge, SectionTitle } from '@/components/ui';
import { fadeInUp, slideInLeft, slideInRight } from '@/hooks/useScrollAnimation';

const featuredProject = {
  // title: 'Sistema de Gestión de Limpieza de Comunidades', // Translated
  // subtitle: 'Proyecto Destacado', // Translated
  // description: ..., // Translated
  features: [
    'dashboard',
    'management',
    'calendar',
    'realtime',
    'pdf',
    'mobile',
  ], // Keys for translation
  stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Firebase', 'Supabase', 'Capacitor'],
  stats: {
    lines: '31K+',
    files: '222',
    components: '151',
    commits: '100+',
  },
  demoUrl: 'https://j-barranco.web.app',
  repoUrl: 'https://github.com/zerocodedevops',
};

import { useState, useEffect } from 'react';

const projectImages = Array.from({ length: 9 }, (_, i) => `/assets/projects/j-barranco/${i + 1}.png`);

export function FeaturedProject() {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % projectImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary-500/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent-500/10 to-transparent blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <SectionTitle
          title={t('featuredProject.title')}
          subtitle={t('featuredProject.subtitle')}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual side - Code Preview */}
          <motion.div
            className="relative"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
              
              {/* Main frame - Slideshow */}
              <div className="relative bg-dark-900 border border-dark-700/50 rounded-2xl overflow-hidden shadow-2xl aspect-[16/10]">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={projectImages[currentImage]}
                    src={projectImages[currentImage]}
                    alt={`ZeroCode Project Demo Slide ${currentImage + 1}`}
                    className="absolute inset-0 w-full h-full object-fill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>

                {/* Progress Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-dark-900/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-dark-700/30">
                  {projectImages.map((img, idx) => (
                    <button
                      key={img}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImage ? 'bg-primary-400 w-4' : 'bg-dark-500 hover:bg-dark-300'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/30 text-accent-400 text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              {t('featuredProject.badge')}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-dark-100 mb-4">
              {t('featuredProject.projectTitle')}
            </h3>

            <p className="text-dark-400 text-sm sm:text-base mb-6 leading-relaxed">
              {t('featuredProject.description')}
            </p>

            <div className="mb-6 p-4 rounded-lg bg-primary-500/5 border border-primary-500/10">
              <p className="text-sm text-dark-300 italic">
                <Trans i18nKey="featuredProject.quote">
                  "Este sistema fue desarrollado <span className="text-primary-400 font-medium">sin formación previa</span>, guiado completamente por <span className="text-accent-400 font-medium">IA</span> y <span className="text-green-400 font-medium">validado en producción</span>."
                </Trans>
              </p>
            </div>

            {/* Features list */}
            <ul className="space-y-2 mb-6">
              {featuredProject.features.map((featureKey, index) => (
                <motion.li
                  key={featureKey}
                  className="flex items-start gap-3 text-dark-300 text-sm"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  {t(`featuredProject.features.${featureKey}`)}
                </motion.li>
              ))}
            </ul>

            {/* Tech stack */}
            <div className="mb-6">
              <p className="text-dark-500 text-sm mb-3">{t('featuredProject.stackTitle')}</p>
              <div className="flex flex-wrap gap-2">
                {featuredProject.stack.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-dark-800/30 rounded-xl border border-dark-700/50">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xl font-bold text-primary-400">
                  <FileCode className="w-4 h-4" />
                  {featuredProject.stats.lines}
                </div>
                <div className="text-dark-500 text-xs">{t('featuredProject.stats.lines')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-accent-400">{featuredProject.stats.files}</div>
                <div className="text-dark-500 text-xs">{t('featuredProject.stats.files')}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xl font-bold text-green-400">
                  <Users className="w-4 h-4" />
                  {featuredProject.stats.components}
                </div>
                <div className="text-dark-500 text-xs">{t('featuredProject.stats.components')}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xl font-bold text-orange-400">
                  <GitCommit className="w-4 h-4" />
                  {featuredProject.stats.commits}
                </div>
                <div className="text-dark-500 text-xs">{t('featuredProject.stats.commits')}</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                leftIcon={<ExternalLink className="w-5 h-5" />}
                onClick={() => window.open(featuredProject.demoUrl, '_blank')}
              >
                {t('featuredProject.buttons.demo')}
              </Button>
              <Button
                variant="outline"
                leftIcon={<GithubIcon className="w-5 h-5" />}
                onClick={() => window.open(featuredProject.repoUrl, '_blank')}
              >
                {t('featuredProject.buttons.code')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
