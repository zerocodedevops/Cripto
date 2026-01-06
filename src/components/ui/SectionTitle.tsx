import { ComponentProps } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp } from '@/hooks/useScrollAnimation';

interface SectionTitleProps extends ComponentProps<typeof motion.div> {
  readonly title: string;
  readonly subtitle?: string;
  readonly centered?: boolean;
  readonly gradient?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  centered = true,
  gradient = true,
  className,
  ...props
}: SectionTitleProps) {
  return (
    <motion.div
      className={cn('mb-12 lg:mb-16', centered && 'text-center', className)}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      {...props}
    >
      <h2
        className={cn(
          'heading-2',
          gradient
            ? 'bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent'
            : 'text-dark-100'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-dark-400 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="h-1 w-8 rounded-full bg-primary-500" />
        <span className="h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
        <span className="h-1 w-8 rounded-full bg-accent-500" />
      </div>
    </motion.div>
  );
}
