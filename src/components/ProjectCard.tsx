'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '@/lib/projects-data';

type Project = typeof projectsData[0];

interface ProjectCardProps {
  project: Project;
  index: number;
}

const categoryAccents: Record<string, string> = {
  'Travel & Logistics': '#06b6d4',
  'E-Commerce': '#8b5cf6',
  SaaS: '#f59e0b',
  'Personal Brand': '#10b981',
  'Component Library': '#ec4899',
};

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const accent = categoryAccents[project.category] || '#f59e0b';
  const accentVar = { '--card-accent': accent } as React.CSSProperties;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.5,
        ease,
        delay: reduceMotion ? 0 : index * 0.08,
      }}
      style={accentVar}
      className="group relative bg-card border border-border/60 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08),0_0_0_1px_var(--card-accent)/0.15] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.25),0_0_0_1px_var(--card-accent)/0.12]"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--card-accent)] opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-10"
      />

      {/* Preview area */}
      <div className="relative h-36 sm:h-44 bg-gradient-to-br from-[var(--card-accent)]/5 via-background to-background border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm3 3h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        <motion.div
          className="absolute top-3 left-3 flex gap-1.5"
          initial={false}
        >
          <span className="w-2 h-2 rounded-full bg-red-400/60" />
          <span className="w-2 h-2 rounded-full bg-amber-400/60" />
          <span className="w-2 h-2 rounded-full bg-green-400/60" />
        </motion.div>
        <div className="absolute bottom-3 left-3 right-3 flex gap-1.5">
          <motion.div
            className="h-1.5 rounded-full bg-[var(--card-accent)]/30"
            initial={{ width: '40%' }}
            whileHover={{ width: '70%' }}
            transition={{ duration: 0.3 }}
          />
          <div className="h-1.5 w-1/4 rounded-full bg-border/50" />
          <div className="h-1.5 w-1/5 rounded-full bg-border/50" />
        </div>
      </div>

      <a
        href={project.liveUrl || project.githubUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.name} project`}
        className="flex flex-col h-full p-6 sm:p-7 pt-5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span
              className="inline-block text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md mb-3"
              style={{ color: accent, backgroundColor: `${accent}14` }}
            >
              {project.category}
            </span>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground leading-snug">
              {project.name}
            </h3>
            <p className="mt-1.5 text-sm text-foreground-muted leading-relaxed">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Stats */}
        {project.stats && project.stats.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {project.stats.slice(0, 3).map((s) => (
              <div key={s.label} className="bg-muted/40 border border-border/30 rounded-lg px-3 py-2.5 group-hover:bg-card-hover transition-colors duration-300">
                <span className="block text-base font-semibold text-foreground tracking-tight">{s.value}</span>
                <span className="block text-[11px] text-foreground-subtle mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom */}
        <div className="mt-4 pt-4 border-t border-border/40">
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono text-foreground-subtle bg-muted/60 border border-border/30 rounded-md transition-all duration-200 hover:border-[var(--card-accent)]/20 hover:text-[var(--card-accent)] hover:scale-105"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-mono text-foreground-subtle bg-muted/60 border border-border/30 rounded-md">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-foreground-subtle/70">{project.duration}</span>
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <motion.span
                  className="text-foreground-subtle/50 hover:text-[var(--card-accent)] transition-colors duration-200 p-1 rounded"
                  aria-label="Source code"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.2 }}
                >
                  <GithubIcon />
                </motion.span>
              )}
              <span className="flex items-center gap-1 text-xs font-medium text-foreground-subtle/70 group-hover:text-[var(--card-accent)] transition-colors duration-300">
                <span>View project</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110" />
              </span>
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  );
}