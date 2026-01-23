/* eslint-disable @typescript-eslint/no-deprecated */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';
import { ArrowRight, Calendar } from 'lucide-react';
import { articles } from '@/data/articles';

export function Blog() {
  const { t } = useTranslation();

  return (
    <section id="blog" className="section relative">
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
            Últimas <span className="text-gradient">Reflexiones</span>
          </h2>
          <p className="text-xl text-dark-300 font-medium mb-12">
            Pensamientos sobre desarrollo, IA y el futuro de la tecnología
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={fadeInUp}>
              <Link to={`/blog/${article.id}`} className="block h-full">
                <Card className="h-full flex flex-col group cursor-pointer hover:bg-dark-800/80 transition-colors border border-dark-700/50 overflow-hidden">
                  {/* Image/Header */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10" />
                    <img
                      src={article.image}
                      alt={t(`blog.items.${article.id}.title`) || article.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-900/40 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                        {t(`blog.items.${article.id}.category`) || article.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 z-20 bg-dark-900/50 p-2 rounded-full backdrop-blur-sm border border-dark-700/50">
                      <article.icon className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 bg-dark-900/40">
                    <div className="flex items-center gap-4 text-xs text-dark-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </div>
                      <span>•</span>
                      <span>{article.readTime} de lectura</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-tight">
                      {t(`blog.items.${article.id}.title`) || article.title}
                    </h3>

                    <p className="text-dark-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {t(`blog.items.${article.id}.excerpt`) || article.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all mt-auto">
                      Leer más <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
