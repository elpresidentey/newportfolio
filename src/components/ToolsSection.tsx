'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const toolCategories = [
  {
    label: 'Languages',
    tools: ['TypeScript', 'JavaScript'],
  },
  {
    label: 'Frontend',
    tools: ['React', 'Next.js', 'TailwindCSS', 'Framer Motion', 'shadcn/ui'],
  },
  {
    label: 'Backend',
    tools: ['Node.js', 'Express', 'REST APIs', 'GraphQL'],
  },
  {
    label: 'Database',
    tools: ['PostgreSQL', 'MongoDB', 'Prisma', 'Firebase'],
  },
  {
    label: 'Tools',
    tools: ['Git', 'GitHub', 'VS Code', 'Figma', 'Vercel'],
  },
];

const allTools = toolCategories.flatMap((c) => c.tools);

export default function ToolsSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.15], [24, 0]);

  useEffect(() => {
    if (reduceMotion || !scrollRef.current) return;
    const el = scrollRef.current;
    let id: number;

    const step = () => {
      if (!hovering) {
        el.scrollLeft += 0.5;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [hovering, reduceMotion]);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-6 overflow-hidden">
      <div className="container-main mb-10 sm:mb-14">
        <motion.div style={{ opacity: headingOpacity, y: reduceMotion ? 0 : headingY }}>
          <span className="section-label">Toolbox</span>
          <h2 className="section-title">Technologies &amp; Tools</h2>
          <p className="section-desc max-w-lg">
            The tools I reach for daily to design, build, and ship products.
          </p>
        </motion.div>
      </div>

      {/* Category grid — desktop */}
      <div className="container-main hidden sm:grid grid-cols-5 gap-4 mb-12">
        {toolCategories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : ci * 0.06 }}
              className="bg-card card-glow rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
            >
              <span className="text-[11px] font-semibold tracking-wider uppercase text-accent">{cat.label}</span>
              <div className="mt-3 space-y-1.5">
                {cat.tools.map((tool) => (
                  <span key={tool} className="block text-xs text-foreground-muted font-mono transition-colors duration-200 hover:text-accent">{tool}</span>
                ))}
              </div>
            </motion.div>
        ))}
      </div>

      {/* Scrolling strip — all viewports */}
      <div className="max-w-7xl mx-auto">
        <div
          ref={scrollRef}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="flex gap-2 overflow-x-auto pb-2 px-6 select-none scrollbar-hide"
        >
          {[...allTools, ...allTools].map((tool, i) => (
            <motion.span
              key={`${tool}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduceMotion ? 0 : (i % allTools.length) * 0.02, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 px-4 py-2 text-sm font-mono text-foreground-muted bg-card border border-border hover:border-accent/30 hover:bg-card-hover hover:text-foreground rounded-lg transition-all duration-300 cursor-default"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}