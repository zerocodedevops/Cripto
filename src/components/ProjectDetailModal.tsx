import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Cpu, Server, Zap, Shield, Code, Layers } from 'lucide-react';
import { Button } from './ui';
import { trackEvent } from '@/lib/analytics';

// Import type from Projects.tsx relative path? Or redefine.
// Redefining for simplicity or export from Projects.tsx 
// Ideally should be in a types file.
interface Project {
  id: number;
  title: string;
  image?: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  status?: 'Prototype' | 'Production' | 'Development';
}

interface ProjectDetailModalProps {
  readonly project: Project | null;
  readonly onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {

  if (!project) return null;

  // Hardcoded Case Study Data for DevOps Shop
  // In a real app, this would come from a CMS or translations
  const isDevOpsShop = project.title === 'DevOps Shop';

  const caseStudy = isDevOpsShop ? {
    problem: "Los e-commerce SPA tradicionales sufren de 'Flash of Missing Content' y mala gestión de estado del carrito.",
    solution: "Implementé una arquitectura híbrida con persistencia local robusta y partición de código granular.",
    architecture: [
      { icon: Cpu, title: "Frontend", desc: "React + Redux Toolkit para gestión de estado predecible." },
      { icon: Server, title: "Backend", desc: "Firebase (Serverless) para escalar sin mantenimiento." },
      { icon: Shield, title: "Seguridad", desc: "Políticas CSP estrictas y validación Zod." },
      { icon: Zap, title: "Performance", desc: "Lazy Loading y optimización de assets con Vite." }
    ],
    challenges: [
      "Persistencia de carrito entre sesiones sin auth.",
      "Optimización de carga inicial (LCP) bajo 1.5s.",
      "Testing E2E estable en entorno CI/CD."
    ]
  } : null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-dark-900 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-dark-700"
            >
              {/* Header Image */}
              <div className="relative h-48 md:h-64 bg-dark-800 shrink-0">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900 to-dark-900">
                    <Code className="w-20 h-20 text-white/20" />
                  </div>
                )}
                
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark-900 to-transparent">
                  <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-white/10 text-white text-xs rounded-md backdrop-blur-sm border border-white/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
                
                {caseStudy ? (
                  <>
                     {/* Introduction */}
                     <div className="grid md:grid-cols-2 gap-8">
                        <section>
                          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-indigo-500" />
                            El Desafío
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {caseStudy.problem}
                          </p>
                        </section>
                        <section>
                          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            La Solución
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {caseStudy.solution}
                          </p>
                        </section>
                     </div>

                     {/* Architecture Grid */}
                     <section>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Arquitectura Técnica</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {caseStudy.architecture.map((item, idx) => (
                            <div key={idx} className="p-4 bg-slate-50 dark:bg-dark-800 rounded-xl border border-slate-100 dark:border-dark-700 hover:border-indigo-500/30 transition-colors">
                              <div className="flex items-center gap-3 mb-2">
                                <item.icon className="w-5 h-5 text-indigo-500" />
                                <h4 className="font-bold text-slate-800 dark:text-indigo-100">{item.title}</h4>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                     </section>

                     {/* Challenges List */}
                     <section>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Retos Superados</h3>
                        <ul className="space-y-2">
                          {caseStudy.challenges.map((challenge, idx) => (
                             <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                               <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                               {challenge}
                             </li>
                          ))}
                        </ul>
                     </section>
                  </>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <p>Detalles del caso de estudio próximamente.</p>
                  </div>
                )}

              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-slate-200 dark:border-dark-700 bg-slate-50 dark:bg-dark-800/50 flex justify-between items-center shrink-0">
                 <div className="text-sm text-slate-500">
                    Estado: <span className="font-medium text-slate-800 dark:text-white">{project.status}</span>
                 </div>
                 <div className="flex gap-3">
                    {project.repoUrl && (
                       <Button 
                         variant="outline" 
                         size="sm"
                         leftIcon={<Github className="w-4 h-4" />}
                         onClick={() => window.open(project.repoUrl, '_blank')}
                       >
                         Código
                       </Button>
                    )}
                    {project.demoUrl && (
                       <Button 
                         variant="primary" 
                         size="sm"
                         rightIcon={<ExternalLink className="w-4 h-4" />}
                         onClick={() => {
                            window.open(project.demoUrl, '_blank');
                            trackEvent('ProjectModal', 'ClickDemo', project.title);
                         }}
                       >
                         Ver Demo
                       </Button>
                    )}
                 </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
