'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Layers, Clock3, UserRound, Sparkles } from 'lucide-react';
import { projectsData } from '@/lib/projects-data';

type Project = typeof projectsData[0];
type LayoutSize = 'large' | 'small';

interface BentoCardProps {
  project: Project;
  layout: LayoutSize;
  index: number;
  onSelect?: (project: Project) => void;
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

export default function BentoCard({ project, layout, index, onSelect }: BentoCardProps) {
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const isLarge = layout === 'large';
  const accent = categoryAccents[project.category] || { color: '#f59e0b', bg: 'from-amber-500/10 via-transparent to-transparent' };
  const accentVar = { '--card-accent': accent.color } as React.CSSProperties;

  const handleCardClick = () => onSelect?.(project);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.(project);
    }
  };

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
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-label={onSelect ? `View details for ${project.name}` : undefined}
      className={`group relative bg-card border border-border/60 transition-all duration-500 overflow-hidden flex flex-col ${sizeStyles[layout]} min-h-[280px] sm:min-h-[320px] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1),0_0_0_1px_var(--card-accent)/0.2] dark:shadow-[0_1px_3px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.25),0_0_0_1px_var(--card-accent)/0.15] hover:-translate-y-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2`}
    >
      {/* Category gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accent.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl`} />

      {/* Top accent line */}
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--card-accent)]/0 to-transparent group-hover:via-[var(--card-accent)]/40 transition-all duration-700" />

      {/* Image header for large cards */}
      {isLarge && (
        <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-muted/60 border-b border-border/40 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--card-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          {/* Floating pill on image */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold rounded-full border backdrop-blur bg-card/90"
              style={{ color: accent.color, borderColor: `${accent.color}22` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent.color }} />
              {project.category}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-foreground-muted bg-card/90 backdrop-blur border border-border/30 rounded-full px-2.5 py-1">
              <Clock3 className="w-3 h-3" />
              {project.duration}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 p-5 sm:p-6 h-full relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {!isLarge && (
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="px-2 py-0.5 text-[10px] font-semibold rounded-md"
                  style={{ color: accent.color, backgroundColor: `${accent.color}14` }}
                >
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-foreground-subtle">
                  <Clock3 className="w-3 h-3" />
                  {project.duration}
                </span>
              </div>
            )}
            {isLarge && (
              <div className="hidden sm:flex items-center gap-2 mb-2 text-[11px] text-foreground-subtle">
                <span className="inline-flex items-center gap-1">
                  <UserRound className="w-3 h-3" />
                  {project.role}
                </span>
                <span className="w-1 h-1 rounded-full bg-foreground-subtle/40" />
                <span className="inline-flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  {project.techStack.slice(0, 2).join(' · ')}
                </span>
              </div>
            )}
            <h3 className={`font-semibold tracking-tight leading-snug transition-colors duration-300 ${isLarge ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'} text-foreground`}>
              {project.name}
            </h3>
            <p className={`text-foreground-muted leading-relaxed ${isLarge ? 'mt-1 text-sm line-clamp-1' : 'mt-1 text-xs line-clamp-1'}`}>
              {project.subtitle}
            </p>
            <p className={`text-foreground-muted/90 leading-relaxed ${isLarge ? 'mt-2.5 text-[13px] line-clamp-2' : 'mt-2 text-xs line-clamp-2'}`}>
              {project.summary}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0 pt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg text-foreground-subtle hover:text-foreground hover:bg-muted transition-colors duration-200"
                aria-label={`Open ${project.name} live site`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg text-foreground-subtle hover:text-foreground hover:bg-muted transition-colors duration-200"
                aria-label={`Open ${project.name} source code`}
              >
                <GithubIcon />
              </a>
            )}
          </div>
        </div>

        {/* Stats — always visible, density by size */}
        {project.stats && project.stats.length > 0 && (
          <div className={isLarge ? 'mt-4 grid grid-cols-3 gap-2.5' : 'mt-3.5 flex gap-2'}>
            {project.stats.slice(0, isLarge ? 3 : 2).map((s, i) => (
              <div
                key={s.label}
                className={
                  isLarge
                    ? 'bg-muted/40 border border-border/30 rounded-lg px-3 py-2.5 group-hover:bg-muted/60 transition-colors duration-300'
                    : 'flex-1 bg-muted/40 border border-border/30 rounded-lg px-2.5 py-2 group-hover:bg-muted/60 transition-colors duration-300'
                }
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className={`block font-semibold tracking-tight text-foreground ${isLarge ? 'text-base' : 'text-sm'}`}>{s.value}</span>
                <span className={`block text-foreground-subtle ${isLarge ? 'text-[11px] mt-0.5' : 'text-[10px] mt-0.5 leading-none'}`}>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Features — product-relevant details */}
        {project.features && project.features.length > 0 && (
          <div className="mt-3.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-foreground-subtle mb-2">
              <Sparkles className="w-3 h-3" />
              Highlights
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.features.slice(0, isLarge ? 4 : 2).map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-foreground-muted bg-muted/60 border border-border/30 rounded-full group-hover:border-[var(--card-accent)]/15 group-hover:text-foreground transition-colors duration-200"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--card-accent)] opacity-70" />
                  {f}
                </span>
              ))}
              {project.features.length > (isLarge ? 4 : 2) && (
                <span className="px-2 py-1 text-[10px] font-medium text-foreground-subtle bg-muted/40 border border-border/30 rounded-full">
                  +{project.features.length - (isLarge ? 4 : 2)} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1 min-h-[8px]" />

        {/* Bottom section */}
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.techStack.slice(0, isLarge ? 5 : 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono text-foreground-subtle bg-muted/60 border border-border/30 rounded-md hover:border-[var(--card-accent)]/20 hover:text-[var(--card-accent)] transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > (isLarge ? 5 : 3) && (
              <span className="px-2 py-0.5 text-[10px] font-mono text-foreground-subtle bg-muted/60 border border-border/30 rounded-md">
                +{project.techStack.length - (isLarge ? 5 : 3)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/40">
            <span className="text-[11px] text-foreground-subtle/70 inline-flex items-center gap-1.5">
              <span className="hidden sm:inline">{project.role}</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-border" />
              <span>{isLarge ? 'View details' : 'Details'}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-foreground-subtle/70 group-hover:text-[var(--card-accent)] transition-colors duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
