'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projectsData } from '@/lib/projects-data';

type Project = typeof projectsData[0];

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.7,
        ease,
        delay: reduceMotion ? 0 : index * 0.05,
      }}
      className="group relative bg-card hover:bg-card-hover border border-border hover:border-border-hover rounded-xl transition-all duration-500"
    >
      <a
        href={project.githubUrl || project.liveUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-5 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              {project.category && (
                <span className="px-2 py-0.5 text-[11px] font-medium text-accent/90 bg-accent/10 rounded-md">
                  {project.category}
                </span>
              )}
              <span className="text-[11px] text-foreground-subtle">
                {project.role}
              </span>
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
              {project.name}
            </h3>
            <p className="mt-1 text-sm text-foreground-muted leading-relaxed line-clamp-2">
              {project.summary}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {project.liveUrl && (
              <span className="p-1.5 rounded-md text-foreground-subtle hover:text-foreground hover:bg-muted transition-all duration-200">
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </span>
            )}
            {project.githubUrl && (
              <span className="p-1.5 rounded-md text-foreground-subtle hover:text-foreground hover:bg-muted transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 5).map((tech: string) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] font-mono text-foreground-subtle bg-muted rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-xs text-foreground-subtle">
            {project.duration}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-foreground-subtle group-hover:text-accent transition-colors duration-300">
            <span>Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </span>
        </div>
      </a>

      {project.stats && project.stats.length > 0 && (
        <div className="mx-5 sm:mx-6 pb-5 sm:pb-6 pt-0">
          <div className="flex flex-wrap gap-x-5 gap-y-1 pt-3 border-t border-border/50">
            {project.stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5">
                <span className="text-sm font-semibold text-foreground">{stat.value}</span>
                <span className="text-[11px] text-foreground-subtle">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
}