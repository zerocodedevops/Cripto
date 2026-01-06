import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { 
  Code2, 
  Server, 
  TestTube,
  Wrench,
  Smartphone,
  FileCode2,
  Cloud,
  Palette,
  GitBranch,
  Terminal,
  Zap,
  Bot,
  Brain,
  MessageSquare,
  Puzzle,
  Search
} from 'lucide-react';
import { SectionTitle } from '@/components/ui';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';

interface Skill {
  name: string;
  nameKey?: string; // Optional key for translation
  icon: React.ReactNode;
  level: number; // 0-100
}

interface SkillCategory {
  key: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

const skillCategoriesData: SkillCategory[] = [
  {
    key: 'frontend',
    icon: <Code2 className="w-6 h-6" />,
    color: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'React', icon: <FileCode2 className="w-4 h-4" />, level: 95 },
      { name: 'TypeScript', icon: <FileCode2 className="w-4 h-4" />, level: 90 },
      { name: 'Tailwind CSS', icon: <Palette className="w-4 h-4" />, level: 95 },
      { name: 'Vite', icon: <Zap className="w-4 h-4" />, level: 85 },
      { name: 'React Hook Form', icon: <FileCode2 className="w-4 h-4" />, level: 80 },
    ],
  },
  {
    key: 'backend',
    icon: <Server className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Firebase', icon: <Cloud className="w-4 h-4" />, level: 95 },
      { name: 'Supabase', icon: <Server className="w-4 h-4" />, level: 70 },
      { name: 'Node.js', icon: <Terminal className="w-4 h-4" />, level: 75 },
      { name: 'Deno', icon: <Terminal className="w-4 h-4" />, level: 60 },
      { name: 'Upstash Redis', icon: <Server className="w-4 h-4" />, level: 65 },
    ],
  },
  {
    key: 'testing',
    icon: <TestTube className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Vitest', icon: <TestTube className="w-4 h-4" />, level: 85 },
      { name: 'Playwright', icon: <TestTube className="w-4 h-4" />, level: 80 },
      { name: 'Testing Library', icon: <TestTube className="w-4 h-4" />, level: 85 },
      { name: 'ESLint', icon: <FileCode2 className="w-4 h-4" />, level: 90 },
      { name: 'Prettier', icon: <FileCode2 className="w-4 h-4" />, level: 85 },
    ],
  },
  {
    key: 'devops',
    icon: <Wrench className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Git', icon: <GitBranch className="w-4 h-4" />, level: 95 },
      { name: 'GitHub Actions', icon: <Zap className="w-4 h-4" />, level: 85 },
      { name: 'Firebase CLI', icon: <Terminal className="w-4 h-4" />, level: 90 },
      { name: 'Capacitor', icon: <Smartphone className="w-4 h-4" />, level: 75 },
      { name: 'PWA/Workbox', icon: <Smartphone className="w-4 h-4" />, level: 80 },
    ],
  },
  {
    key: 'soft',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-amber-500 to-yellow-500',
    skills: [
      { nameKey: 'learning', name: 'Aprendizaje Autónomo', icon: <Search className="w-4 h-4" />, level: 100 },
      { nameKey: 'problemSolving', name: 'Resolución de Problemas', icon: <Puzzle className="w-4 h-4" />, level: 100 },
      { nameKey: 'communication', name: 'Comunicación', icon: <MessageSquare className="w-4 h-4" />, level: 95 },
      { nameKey: 'adaptability', name: 'Adaptabilidad', icon: <Zap className="w-4 h-4" />, level: 95 },
      { nameKey: 'criticalThinking', name: 'Pensamiento Crítico', icon: <Brain className="w-4 h-4" />, level: 90 },
    ],
  },
];



// Fixed SkillBar to accept color again
function SkillBarWithColor({ skill, color }: { readonly skill: Skill; readonly color: string }) {
  const { t } = useTranslation();
  const displayName = skill.nameKey 
    ? t(`skills.categories.soft.items.${skill.nameKey}`) 
    : skill.name;

  return (
    <motion.div
      className="group"
      variants={fadeInUp}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-dark-400 group-hover:text-primary-400 transition-colors">
            {skill.icon}
          </span>
          <span className="text-dark-200 text-sm font-medium">{displayName}</span>
        </div>
        <span className="text-dark-500 text-xs">{skill.level}%</span>
      </div>
      <div className="h-2 bg-dark-700/50 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}

function SkillCard({ category }: { readonly category: SkillCategory }) {
  const { t } = useTranslation();

  return (
    <motion.div
      className="card card-hover p-6"
      variants={fadeInUp}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
          {category.icon}
        </div>
        <div>
          <h3 className="heading-3 text-dark-100">{t(`skills.categories.${category.key}.title`)}</h3>
          <p className="text-dark-500 text-xs">{t(`skills.categories.${category.key}.description`)}</p>
        </div>
      </div>
      
      <div className="space-y-4 mt-4">
        {category.skills.map((skill) => (
          <SkillBarWithColor key={skill.name} skill={skill} color={category.color} />
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="section relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary-500/5 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <SectionTitle
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
        />

        {/* AI Badge */}
        <motion.div 
          className="flex justify-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/30 text-accent-400 text-sm">
            <Bot className="w-4 h-4" />
            <span>{t('skills.aiBadge')}</span>
          </div>
        </motion.div>

        {/* Percentage Note */}
        <motion.p 
          className="text-center text-dark-400 text-sm max-w-2xl mx-auto mb-8 italic"
          variants={fadeInUp}
        >
          <Trans i18nKey="skills.disclaimer">
            * Los porcentajes reflejan mi <span className="text-primary-400 font-medium">nivel de autonomía</span> usando cada tecnología en proyectos reales.
          </Trans>
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillCategoriesData.map((category) => (
            <SkillCard key={category.key} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
