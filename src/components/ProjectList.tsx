'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import BentoCard from './BentoCard';
import { projectsData } from '@/lib/projects-data';

type LayoutKey = 'large' | 'small';

const layoutMap: LayoutKey[] = [
  'large',
  'small',
  'small',
  'small',
  'large',
  'small',
  'large',
  'large',
];

export default function ProjectList() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.15], [24, 0]);

  return (
    <section id="work" ref={sectionRef} className="py-24 sm:py-32 px-6">
      <div className="container-main">
        <motion.div
          style={{ opacity: headingOpacity, y: reduceMotion ? 0 : headingY }}
          className="mb-14 sm:mb-20"
        >
          <span className="section-label">Featured Work</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-desc max-w-lg">
            Products I&apos;ve designed and built from concept to production — spanning travel, e-commerce, fintech, and enterprise tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {projectsData.map((project, i) => (
            <BentoCard
              key={project.slug}
              project={project}
              layout={layoutMap[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}