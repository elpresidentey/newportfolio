'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projectsData } from '@/lib/projects-data';

type Project = typeof projectsData[0];
type LayoutSize = 'large' | 'small';

interface BentoCardProps {
  project: Project;
  layout: LayoutSize;
  index: number;
}

const categoryAccents: Record<string, { color: string; bg: string }> = {
  'Travel & Logistics': { color: '#06b6d4', bg: 'from-cyan-500/10 via-transparent to-transparent' },
  'E-Commerce': { color: '#8b5cf6', bg: 'from-violet-500/10 via-transparent to-transparent' },
  SaaS: { color: '#f59e0b', bg: 'from-amber-500/10 via-transparent to-transparent' },
  'Personal Brand': { color: '#10b981', bg: 'from-emerald-500/10 via-transparent to-transparent' },
  Automotive: { color: '#16a34a', bg: 'from-green-600/10 via-transparent to-transparent' },
  'Component Library': { color: '#ec4899', bg: 'from-pink-500/10 via-transparent to-transparent' },
};

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const sizeStyles: Record<LayoutSize, string> = {
  large: 'col-span-1 lg:col-span-2',
  small: 'col-span-1',
};

export default function BentoCard({ project, layout, index }: BentoCardProps) {
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const isLarge = layout === 'large';
  const accent = categoryAccents[project.category] || { color: '#f59e0b', bg: 'from-amber-500/10 via-transparent to-transparent' };
  const accentVar = { '--card-accent': accent.color } as React.CSSProperties;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.6,
        ease,
        delay: reduceMotion ? 0 : index * 0.06,
      }}
      style={accentVar}
      className={`group relative bg-card border border-border/60 transition-all duration-500 overflow-hidden flex flex-col ${sizeStyles[layout]} min-h-[200px] sm:min-h-[260px] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1),0_0_0_1px_var(--card-accent)/0.2] dark:shadow-[0_1px_3px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.25),0_0_0_1px_var(--card-accent)/0.15] hover:-translate-y-1`}
    >
      {/* Category gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accent.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl`} />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--card-accent)]/0 to-transparent group-hover:via-[var(--card-accent)]/40 transition-all duration-700"
      />

      <a
        href={project.liveUrl || project.githubUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.name} project`}
        className="flex flex-col flex-1 p-5 sm:p-6 h-full relative z-10 rounded-xl focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`font-semibold rounded-md ${isLarge ? 'px-2.5 py-1 text-[11px]' : 'px-2 py-0.5 text-[10px]'}`}
                style={{ color: accent.color, backgroundColor: `${accent.color}14` }}
              >
                {project.category}
              </span>
              {isLarge && project.role && (
                <span className="text-[11px] text-foreground-subtle">{project.role}</span>
              )}
            </div>
            <h3 className={`font-semibold tracking-tight leading-snug transition-colors duration-300 ${isLarge ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'} text-foreground`}
                style={{ color: 'var(--color-foreground)' }}>
              {project.name}
            </h3>
            {isLarge && (
              <p className="mt-1.5 text-sm text-foreground-muted leading-relaxed line-clamp-2">
                {project.subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0 pt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0">
            {project.liveUrl && (
              <span className="p-1.5 rounded-lg text-foreground-subtle hover:text-foreground transition-colors duration-200" aria-label="Live site">
                <ExternalLink className="w-4 h-4" />
              </span>
            )}
            {project.githubUrl && (
              <span className="p-1.5 rounded-lg text-foreground-subtle hover:text-foreground transition-colors duration-200" aria-label="Source code">
                <GithubIcon />
              </span>
            )}
          </div>
        </div>

        {/* Stats — mini weather-style cards */}
        {isLarge && project.stats && project.stats.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {project.stats.slice(0, 3).map((s, i) => (
              <div
                key={s.label}
                className="bg-muted/40 border border-border/30 rounded-lg px-3 py-2.5 group-hover:bg-muted/60 transition-colors duration-300"
                style={{
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                <span className="block text-base font-semibold text-foreground tracking-tight">{s.value}</span>
                <span className="block text-[11px] text-foreground-subtle mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom section */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {project.techStack.slice(0, isLarge ? 5 : 2).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono text-foreground-subtle bg-muted/60 border border-border/30 rounded-md hover:border-[var(--card-accent)]/20 hover:text-[var(--card-accent)] transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > (isLarge ? 5 : 2) && (
              <span className="px-2 py-0.5 text-[10px] font-mono text-foreground-subtle bg-muted/60 border border-border/30 rounded-md">
                +{project.techStack.length - (isLarge ? 5 : 2)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/40">
            <span className="text-[11px] text-foreground-subtle/70">{project.duration}</span>
            <span
              className={`flex items-center gap-1.5 font-medium transition-colors duration-300 ${isLarge ? 'text-xs' : 'text-[11px]'} text-foreground-subtle/70 group-hover:text-[var(--card-accent)]`}
            >
              {isLarge && <span>View project</span>}
              <ArrowUpRight className={`transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isLarge ? 'w-4 h-4' : 'w-3 h-3'}`} />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}