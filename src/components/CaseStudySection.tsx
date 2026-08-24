'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring, useTransform as useMotionTransform } from 'framer-motion';
import {
  ArrowUpRight, ExternalLink, Gauge, Zap, DollarSign,
  Activity, MapPin, LayoutDashboard, WifiOff,
  Monitor, Map, Brain, BarChart3, Bell,
  ChevronRight
} from 'lucide-react';

const project = {
  slug: 'arms',
  name: 'ARMS',
  subtitle: 'Waste Logistics SaaS',
  overview: 'An AI-powered SaaS platform that helps municipalities collect smarter, not more often. ARMS ingests bin fill-level sensor data, dynamically rebuilds collection routes, and tracks fleets in real time — cutting fuel consumption, operational cost, and environmental impact in one continuous loop.',
  problem: 'Municipalities across Africa lose millions every year collecting waste on guesswork. Trucks drive half-empty routes on fixed timetables while bins overflow elsewhere — because static schedules never reflect actual demand. The cost shows up in fuel bills, missed collections, and frustrated citizens.',
  solution: 'Built a full-stack platform that turns raw sensor telemetry into dispatch decisions: fill-level data feeds a route optimization engine that recalculates truck routes as conditions change. Over time the system learns each zone\'s fill patterns and predicts demand — shifting operations from reactive to proactive.',
  role: 'Owned the frontend architecture end-to-end: the analytics dashboard, real-time fleet tracking map, route visualization interface, and cost analytics portal. Shaped the UI around the optimization engine\'s parameters and integrated Mapbox for live fleet tracking.',
  challenges: [
    { text: 'Real-time data sync between IoT sensors and the dashboard with sub-second latency', icon: Activity },
    { text: 'Visualizing complex multi-vehicle routes on an interactive map without performance degradation', icon: MapPin },
    { text: 'Designing an intuitive analytics dashboard that makes complex data actionable for non-technical users', icon: LayoutDashboard },
    { text: 'Handling offline scenarios where sensor data is delayed or missing', icon: WifiOff },
  ],
  features: [
    { text: 'Real-time dashboard with live fill-level monitoring across all bins', icon: Monitor },
    { text: 'Interactive map view with dynamic route visualization and fleet tracking', icon: Map },
    { text: 'AI-powered route optimization engine with drag-adjustable parameters', icon: Brain },
    { text: 'Cost analytics portal with fuel savings, efficiency scores, and trend charts', icon: BarChart3 },
    { text: 'Automated reporting and alert system for overflow bins and route deviations', icon: Bell },
  ],
  results: [
    { label: 'Fuel Savings', value: '-35%', icon: Gauge },
    { label: 'Route Efficiency', value: '+50%', icon: MapPin },
    { label: 'Cost Reduction', value: '-28%', icon: DollarSign },
    { label: 'Response Time', value: '-60%', icon: Zap },
  ],
  techStack: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Mapbox', 'Framer Motion'],
  liveUrl: 'https://arms-roan.vercel.app',
  githubUrl: 'https://github.com/elpresidentey/arms.git',
  duration: '4 Months',
};

function AnimatedStat({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const num = parseFloat(value.replace(/[^0-9.-]/g, ''));
  const suffix = value.replace(/[0-9.-]/g, '');
  const sign = value.startsWith('+') ? '+' : value.startsWith('-') ? '-' : '';
  const absNum = Math.abs(num);

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 25, stiffness: 120 });
  const rounded = useMotionTransform(spring, (v: number) => Math.round(v));

  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!reduceMotion && inView) {
      motionValue.set(absNum);
      const unsubscribe = rounded.on('change', (v: number) => setDisplayed(v));
      return unsubscribe;
    }
    if (reduceMotion && inView) {
      setDisplayed(absNum);
    }
  }, [inView, reduceMotion, absNum, motionValue, rounded]);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center sm:text-left group">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent mb-3 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-5 h-5" />
      </div>
      <span className="block text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        {sign}{displayed}{suffix}
      </span>
      <span className="block mt-1 text-xs font-medium text-foreground-muted">{label}</span>
    </div>
  );
}

export default function CaseStudySection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const ease = [0.22, 1, 0.36, 1] as const;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.1], [24, 0]);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-6">
      <div className="container-main">
        <motion.div
          style={{ opacity: headingOpacity, y: reduceMotion ? 0 : headingY }}
          className="mb-14 sm:mb-20"
        >
          <span className="section-label">Case Study</span>
          <h2 className="section-title">{project.name}</h2>
          <p className="section-desc max-w-xl">{project.subtitle} · {project.duration}</p>
        </motion.div>

        <div className="space-y-20 sm:space-y-24">
          {/* Hero banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0.01 : 0.6, ease }}
            className="relative overflow-hidden bg-gradient-to-br from-accent/10 via-accent/5 to-background border border-accent/15 rounded-2xl p-8 sm:p-12"
          >
            <div className="gradient-orb w-64 h-64 bg-accent -top-20 -right-20 opacity-20" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Featured Project
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {project.name}: {project.subtitle}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-foreground-muted max-w-2xl leading-relaxed">
                {project.overview}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary text-xs">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Visit Live Site
                </a>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost text-xs">
                  View Source Code
                </a>
                <span className="text-xs text-foreground-subtle">{project.duration} · Frontend</span>
              </div>
            </div>
          </motion.div>

          {/* Overview / Problem / Solution + Sidebar */}
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-12">
            <div className="sm:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0.01 : 0.5, ease }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-6 h-px bg-accent/50" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-accent">The Problem</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-foreground-muted">
                  {project.problem}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0.01 : 0.5, ease, delay: 0.08 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-6 h-px bg-accent/50" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-accent">The Solution</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-foreground-muted">
                  {project.solution}
                </p>
              </motion.div>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0.01 : 0.5, ease, delay: 0.05 }}
                className="bg-card card-glow rounded-xl p-5"
              >
                <span className="text-[11px] font-semibold tracking-wider uppercase text-foreground-subtle">Role</span>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{project.role}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0.01 : 0.5, ease, delay: 0.1 }}
                className="bg-card card-glow rounded-xl p-5"
              >
                <span className="text-[11px] font-semibold tracking-wider uppercase text-foreground-subtle">Tech Stack</span>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.techStack.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-[10px] font-mono text-foreground-subtle bg-muted/60 border border-border/30 rounded-md transition-colors duration-200 hover:border-accent/30 hover:text-accent">{t}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0.01 : 0.5, ease, delay: 0.15 }}
                className="flex gap-3"
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 btn btn-ghost justify-center text-xs" aria-label="View live site">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Site
                </a>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 btn btn-ghost justify-center text-xs" aria-label="View source code">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Source
                </a>
              </motion.div>
            </div>
          </div>

          {/* Challenges */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-accent/50" />
              <span className="text-xs font-semibold tracking-wider uppercase text-accent">Key Challenges</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.challenges.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.text}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.4, ease, delay: reduceMotion ? 0 : i * 0.06 }}
                    className="group flex items-start gap-4 bg-card card-glow rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                  >
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 text-accent shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-accent/70">Challenge 0{i + 1}</span>
                      <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{c.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-accent/50" />
              <span className="text-xs font-semibold tracking-wider uppercase text-accent">Key Features</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.text}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.4, ease, delay: reduceMotion ? 0 : i * 0.06 }}
                    className="group flex items-center gap-4 bg-card card-glow rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                  >
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/5 border border-accent/10 text-accent shrink-0 group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground flex-1">{f.text}</span>
                    <ChevronRight className="w-4 h-4 text-foreground-subtle/40 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Animated Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0.01 : 0.6, ease }}
            className="bg-card card-glow rounded-2xl p-8 sm:p-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-accent/50" />
              <span className="text-xs font-semibold tracking-wider uppercase text-accent">Results &amp; Impact</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
              {project.results.map((r) => (
                <AnimatedStat key={r.label} value={r.value} label={r.label} icon={r.icon} />
              ))}
            </div>
            <div className="mt-10 pt-6 border-t border-border/40 flex items-center justify-between">
              <span className="text-xs text-foreground-muted">{project.duration} · Frontend Developer</span>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-foreground-muted hover:text-accent transition-colors duration-200"
              >
                View live project
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}