import { motion } from 'framer-motion';
import { Code2, Rocket, Lightbulb, Heart } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { SectionTitle } from '@/components/ui';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';

const highlights = [
  {
    icon: Heart,
    key: 'passion',
  },
  {
    icon: Lightbulb,
    key: 'ai',
  },
  {
    icon: Rocket,
    key: 'autodidact',
  },
  {
    icon: Code2,
    key: 'commitment',
  },
];

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="section relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent-500/5 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <SectionTitle
          title={t('about.title')}
          subtitle={t('about.subtitle')}
        />

        <div className="flex flex-col items-center gap-12 max-w-4xl mx-auto">
          {/* Image/Visual side */}
          <motion.div
            className="relative w-full max-w-md"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative aspect-square">
              {/* Decorative frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-3xl rotate-6 blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-3xl -rotate-3" />
              
              {/* Main content area */}
              <div className="relative bg-dark-800/50 backdrop-blur-xl rounded-3xl p-8 border border-dark-700/50 h-full flex items-center justify-center">
                <img 
                  src="/logo-zerocode.jpg" 
                  alt="ZeroCode DevOps - David G." 
                  className="w-full max-w-[384px] h-auto rounded-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            className="text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 variants={fadeInUp} className="heading-3 text-dark-100 mb-6">
              {t('about.role')}
            </motion.h3>
            
            <motion.div variants={fadeInUp} className="space-y-6 text-dark-400 text-lg leading-relaxed">
              <p>
                <Trans i18nKey="about.description.p1">
                  No vengo del camino clásico del desarrollo y no pretendo aparentarlo. Mi fortaleza no está en memorizar sintaxis, sino en <span className="text-primary-400 font-medium">entender problemas, diseñar soluciones</span> y apoyarme en <span className="text-accent-400 font-medium">herramientas de Inteligencia Artificial</span> para <span className="text-primary-400 font-medium">convertir ideas en aplicaciones reales</span>.
                </Trans>
              </p>
              
              <div className="inline-block text-left bg-dark-800/30 p-6 rounded-2xl border border-dark-700/30">
                <p className="mb-4 font-medium text-dark-200">
                  <Trans i18nKey="about.description.boxTitle">
                    Trabajo con IA como un <span className="text-accent-400">colaborador técnico</span> que:
                  </Trans>
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside text-dark-300">
                  <li>{t('about.description.boxList.item1')}</li>
                  <li>{t('about.description.boxList.item2')}</li>
                  <li>{t('about.description.boxList.item3')}</li>
                  <li>{t('about.description.boxList.item4')}</li>
                </ul>
              </div>
              
              <p>
                <Trans i18nKey="about.description.p2">
                  Mi enfoque es práctico: no soy un programador tradicional, pero sí soy alguien capaz de <span className="text-primary-400 font-medium">llevar un proyecto desde la idea hasta un producto funcional</span>, entendiendo cada paso del proceso y mejorando con cada iteración.
                </Trans>
              </p>

              <p>
                <Trans i18nKey="about.description.p3">
                  Creo en la <span className="text-primary-400 font-medium">transparencia</span>, en el <span className="text-accent-400 font-medium">aprendizaje continuo</span> y en aprovechar la tecnología para <span className="text-primary-400 font-medium">crear valor</span>.
                </Trans>
              </p>

              <p>
                <Trans i18nKey="about.description.p4">
                  Mi verdadera fortaleza es el <span className="text-primary-400 font-medium">compromiso 
                  absoluto</span> con cada proyecto. Me involucro al 200%, obsesionándome con los detalles 
                  y no descansando hasta que el resultado supera las expectativas. Cada reto es una 
                  oportunidad de aprendizaje, y cada error es un paso hacia la mejora.
                </Trans>
              </p>
            </motion.div>

            {/* Highlights grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {highlights.map((item) => (
                <motion.div
                  key={item.key}
                  variants={fadeInUp}
                  className="p-4 rounded-xl bg-dark-800/30 border border-dark-700/50 hover:border-primary-500/30 transition-colors flex flex-col items-center justify-center text-center gap-2"
                >
                  <item.icon className="w-6 h-6 text-primary-400" />
                  <div className="font-semibold text-dark-100">{t(`about.highlights.${item.key}.title`)}</div>
                  <div className="text-xs text-dark-500">{t(`about.highlights.${item.key}.description`)}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
