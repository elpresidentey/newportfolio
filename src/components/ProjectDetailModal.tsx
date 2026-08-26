'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ExternalLink, Clock3, UserRound, Layers, Target, Lightbulb, Wrench, Sparkles, BarChart3 } from 'lucide-react';
import { projectsData } from '@/lib/projects-data';

type Project = typeof projectsData[0];

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const categoryAccents: Record<string, string> = {
  'Travel & Logistics': '#06b6d4',
  'E-Commerce': '#8b5cf6',
  SaaS: '#f59e0b',
  Automotive: '#16a34a',
};

export function ProjectDetailModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const accent = project ? categoryAccents[project.category] || '#f59e0b' : '#f59e0b';

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${project.name} details`}
              className="pointer-events-auto relative w-full max-w-2xl max-h-[90dvh] sm:max-h-[85dvh] overflow-hidden bg-card border border-border rounded-2xl shadow-2xl flex flex-col"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.35, ease }}
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-muted/80 hover:bg-muted border border-border text-foreground-muted hover:text-foreground transition-colors backdrop-blur"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto scrollbar-hide flex-1">
                {/* Image banner */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-muted border-b border-border shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.imageUrl}
                    alt={`${project.name} preview`}
                    className="h-full w-full object-cover"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-card border shadow-sm" style={{ color: accent, borderColor: `${accent}22` }}>
                        {project.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-foreground-muted bg-card/90 backdrop-blur border border-border/40 rounded-full px-2.5 py-1">
                        <Clock3 className="w-3 h-3" />
                        {project.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-foreground-muted bg-card/90 backdrop-blur border border-border/40 rounded-full px-2.5 py-1">
                        <UserRound className="w-3 h-3" />
                        {project.role}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">{project.name}</h2>
                    <p className="text-sm text-foreground-muted mt-1">{project.subtitle}</p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-6">
                  {/* Summary + CTAs */}
                  <div>
                    <p className="text-sm leading-relaxed text-foreground-muted">{project.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-xs">
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live site
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-xs">
                          <GithubIcon />
                          Source
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  {project.stats && project.stats.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="w-4 h-4 text-accent" />
                        <span className="text-xs font-semibold tracking-wider uppercase text-accent">Impact</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2.5">
                        {project.stats.map((s) => (
                          <div key={s.label} className="bg-muted/50 border border-border/40 rounded-xl px-3 py-3 text-center">
                            <span className="block text-lg font-bold tracking-tight text-foreground">{s.value}</span>
                            <span className="block text-[11px] text-foreground-subtle mt-1 leading-none">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Problem / Solution */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-muted/30 border border-border/40 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-accent" />
                        <span className="text-xs font-semibold tracking-wider uppercase text-accent">Problem</span>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground-muted">{project.problem}</p>
                    </div>
                    <div className="bg-muted/30 border border-border/40 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-accent" />
                        <span className="text-xs font-semibold tracking-wider uppercase text-accent">Solution</span>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground-muted">{project.solution}</p>
                    </div>
                  </div>

                  {/* Challenges */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="w-4 h-4 text-accent" />
                      <span className="text-xs font-semibold tracking-wider uppercase text-accent">Challenges</span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground-muted bg-card border border-border/40 rounded-xl p-4">{project.challenges}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <span className="text-xs font-semibold tracking-wider uppercase text-accent">Key features</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features.map((f) => (
                        <div key={f} className="flex items-center gap-2.5 bg-card border border-border/40 rounded-xl px-3.5 py-3 text-sm text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stack + meta */}
                  <div className="pt-4 border-t border-border/40">
                    <div className="flex items-center gap-2 mb-3">
                      <Layers className="w-4 h-4 text-accent" />
                      <span className="text-xs font-semibold tracking-wider uppercase text-accent">Tech stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((t) => (
                        <span key={t} className="px-2.5 py-1 text-xs font-mono text-foreground-subtle bg-muted border border-border/30 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
