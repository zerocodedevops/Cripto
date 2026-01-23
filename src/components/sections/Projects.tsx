/* eslint-disable @typescript-eslint/no-deprecated */
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TechBadge, Card } from '@/components/ui';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';
import { trackEvent } from '@/lib/analytics';

import projectDevOps from '@/assets/projects/project-devops-shop.jpg';
import projectPortfolio from '@/assets/projects/project-portfolio-dashboard.jpg';
import projectCrypto from '@/assets/projects/project-crypto-dashboard.jpg';
import projectAiChat from '@/assets/projects/project-ai-chat.jpg';
import projectTask from '@/assets/projects/project-task-management.jpg';
import projectSalon from '@/assets/projects/project-salon.jpg';
import projectWeather from '@/assets/projects/project-weather.jpg';
import projectBlog from '@/assets/projects/project-blog.jpg';

interface Project {
  id: number;
  title: string;
  // description: string; // Removed as it will be translated
  image?: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  status?: 'Prototype' | 'Production' | 'Development';
}

const projects: Project[] = [
  // PROTOTYPES - Functional demos
  {
    id: 1,
    title: 'DevOps Shop',
    image: projectDevOps,
    tags: ['React', 'Redux', 'Stripe', 'Tailwind'],
    demoUrl: '#/proyectos/ecommerce',
    repoUrl: 'https://github.com/zerocodedevops',
    status: 'Prototype',
  },
  {
    id: 4,
    title: 'Portfolio Dashboard',
    image: projectPortfolio,
    tags: ['React', 'TanStack Query', 'Recharts', 'MSW'],
    demoUrl: '#/proyectos/analytics/dashboard',
    repoUrl: 'https://github.com/zerocodedevops',
    status: 'Prototype',
  },
  {
    id: 7,
    title: 'Crypto Analytics Dashboard',
    image: projectCrypto,
    tags: ['React', 'TypeScript', 'Recharts', 'CoinGecko API'],
    demoUrl: '#/proyectos/crypto',
    repoUrl: 'https://github.com/zerocodedevops',
    status: 'Prototype',
  },

  // IN DEVELOPMENT - Coming soon
  {
    id: 2,
    title: 'AI Chat Assistant',
    image: projectAiChat,
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'Supabase'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com/zerocodedevops',
    status: 'Development',
  },
  {
    id: 3,
    title: 'Task Management App',
    image: projectTask,
    tags: ['React', 'Firebase', 'Tailwind', 'Framer Motion'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com/zerocodedevops',
    status: 'Development',
  },
  {
    id: 8,
    title: 'Salón de Belleza',
    image: projectSalon,
    tags: ['React', 'Tailwind', 'Vite'],
    demoUrl: '#/proyectos/salon',
    status: 'Development',
  },
  {
    id: 5,
    title: 'Weather App',
    image: projectWeather,
    tags: ['React', 'TypeScript', 'API REST', 'Tailwind'],
    demoUrl: 'https://example.com',
    status: 'Development',
  },
  {
    id: 6,
    title: 'Blog Platform',
    image: projectBlog,
    tags: ['Next.js', 'MDX', 'Tailwind', 'Vercel'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com/zerocodedevops',
    status: 'Development',
  },
];

// Helper functions for status badge
const getStatusStyles = (status: Project['status']) => {
  switch (status) {
    case 'Production':
      return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'Development':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    default:
      return 'bg-amber-500/10 text-amber-500 border-amber-500/20'; // Changed to match "Prototype" orange/amber look
  }
};

const GithubIcon = ({ className }: { readonly className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

import { ProjectDetailModal } from '../ProjectDetailModal';
import { useState } from 'react';

// ... (existing imports)

// ... (existing helper functions)

function ProjectCard({ project, onClick }: { readonly project: Project; readonly onClick: () => void }) {
  const { t } = useTranslation();

  const getStatusLabel = (status: Project['status']) => {
    switch (status) {
      case 'Production':
        return t('projects.status.production');
      case 'Development':
        return t('projects.status.development');
      default:
        // Use translation but fallback to Prototype for now
        return 'PROTOTYPE';
    }
  };

  const thumbnailContent = (() => {
    // ... (keep usage of project.image)
    if (!project.image) {
      return (
        <div
          className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-700 to-dark-800 cursor-pointer"
        >
          <Folder className="w-12 h-12 text-dark-600 group-hover:text-primary-500/50 transition-colors duration-300" />
        </div>
      );
    }

    const imageContent = (
      <>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-dark-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {/* Add View Case Study Button overlay */}
          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="px-4 py-2 bg-white/90 text-dark-900 rounded-full text-sm font-bold hover:bg-white transform hover:scale-105 transition-all shadow-lg"
          >
            Ver Detalles
          </button>
        </div>
      </>
    );
    // Use div instead of button to avoid nested button warning
    return (
      <div className="w-full h-full cursor-pointer">
        {imageContent}
      </div>
    );
  })();

  return (
    <motion.div variants={fadeInUp}>
      <Card className="h-full flex flex-col group overflow-hidden cursor-pointer hover:border-primary-500/30 transition-colors" onClick={onClick}>
        {/* Image thumbnail */}
        <div className="aspect-[16/10] bg-dark-900 rounded-lg mb-4 overflow-hidden relative group-hover:shadow-lg transition-all border border-dark-700/50">
          {thumbnailContent}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="heading-3 text-dark-100 group-hover:text-primary-400 transition-colors">
              {project.title}
            </h3>
            {project.status && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase font-medium tracking-wide whitespace-nowrap ${getStatusStyles(project.status)}`}>
                {getStatusLabel(project.status)}
              </span>
            )}
          </div>
          <p className="text-dark-400 text-sm mb-4 flex-1">
            {t(`projects.items.${project.id}.description`)}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <TechBadge key={tag} tech={tag} />
            ))}
          </div>

          {/* Links - Stop Propagation to prevent modal opening when clicking links? */}
          <div className="flex gap-3">
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-dark-300 hover:text-primary-400 transition-colors"
                whileHover={{ x: 3 }}
                onClick={(e) => { e.stopPropagation(); trackEvent('Project', 'Demo', project.title); }}
              >
                <ExternalLink className="w-4 h-4" />
                {t('projects.links.demo')}
              </motion.a>
            )}
            {project.repoUrl && (
              <motion.a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-dark-300 hover:text-primary-400 transition-colors"
                whileHover={{ x: 3 }}
                onClick={(e) => { e.stopPropagation(); trackEvent('Project', 'Repo', project.title); }}
              >
                <GithubIcon className="w-4 h-4" />
                {t('projects.links.code')}
              </motion.a>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-1/3 h-1/2 bg-gradient-radial from-accent-500/5 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            <span className="text-gradient">Productos Digitales</span>
          </h2>
          <p className="text-xl text-dark-300 font-medium mb-12">
            Una selección de proyectos que demuestran mis habilidades
          </p>

          {/* Section for Featured / SaaS if needed, or just part of the flow */}
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
