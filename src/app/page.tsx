'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import Header from '@/components/Header';
import WeatherWidget from '@/components/WeatherWidget';
import Footer from '@/components/Footer';
import ProjectList from '@/components/ProjectList';
import CaseStudySection from '@/components/CaseStudySection';
import ToolsSection from '@/components/ToolsSection';

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter');

  useEffect(() => {
    if (reduceMotion) { onComplete(); return; }
    const t = setTimeout(() => setPhase('exit'), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-background"
      animate={phase === 'exit' ? { opacity: 0, scale: 0.95, filter: 'blur(4px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, ease }}
      onAnimationComplete={() => { if (phase === 'exit') onComplete(); }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-accent/5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease, delay: 0.2 }}
        style={{ filter: 'blur(60px)' }}
      />

      {/* Letters */}
      <div className="overflow-hidden flex relative">
        {['I', 'E', 'L'].map((letter, i) => (
          <motion.span
            key={letter}
            className="block text-[clamp(3rem,7vw,5rem)] font-semibold tracking-tight text-foreground"
            initial={{ y: '150%', opacity: 0, filter: 'blur(12px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 1.2,
              ease,
              delay: reduceMotion ? 0 : 0.4 + i * 0.28,
            }}
          >
            {letter}
          </motion.span>
        ))}
        <motion.span
          className="text-[clamp(3rem,7vw,5rem)] font-semibold tracking-tight text-accent"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
            delay: reduceMotion ? 0 : 1.5,
          }}
        >
          .
        </motion.span>
      </div>

      {/* Line + glow */}
      <div className="relative flex items-center justify-center h-px">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 260, opacity: 1 }}
          transition={{ duration: 1.4, ease, delay: reduceMotion ? 0 : 2.1 }}
        />
        <motion.div
          className="absolute w-[200px] h-6 rounded-full bg-accent/20"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          transition={{ duration: 1.4, ease, delay: reduceMotion ? 0 : 2.1 }}
          style={{ filter: 'blur(24px)' }}
        />
      </div>

      {/* Subtitle */}
      <motion.p
        className="text-xs tracking-[0.15em] uppercase text-foreground-muted text-center leading-relaxed font-medium"
        initial={{ opacity: 0, y: 16, letterSpacing: '0.4em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.12em' }}
        transition={{ duration: 1.2, ease, delay: reduceMotion ? 0 : 2.8 }}
      >
        Frontend Engineer<span className="mx-1.5 text-foreground-subtle/30">·</span>Product Thinker<span className="mx-1.5 text-foreground-subtle/30">·</span>UX Designer
      </motion.p>
    </motion.div>
  );
}

export default function Page() {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const reduceMotion = useReducedMotion();
  const rafId = useRef<number | null>(null);

  const handleIntroDone = useCallback(() => {
    setShowContent(true);
    setTimeout(() => setShowIntro(false), 200);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    }
    rafId.current = requestAnimationFrame(raf);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showIntro]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <main className="min-h-screen bg-background text-foreground font-sans antialiased bg-noise">
      {/* Intro overlay — unmounts 200ms after content appears */}
      {showIntro && <IntroScreen onComplete={handleIntroDone} />}

      {/* Main content — fades in smoothly */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <WeatherWidget />
        <Header />

        {/* Hero */}
        <section className="relative min-h-[88vh] flex items-center px-6 overflow-hidden">
          <div className="gradient-orb w-[600px] h-[600px] bg-accent -top-48 -right-48" />
          <div className="gradient-orb w-[400px] h-[400px] bg-accent bottom-0 -left-48" style={{ opacity: 0.04 }} />

          <div className="container-main w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.8, ease }}
              className="max-w-2xl"
            >
              <span className="text-xs font-semibold tracking-wider uppercase text-foreground-subtle">
                Hello, I&apos;m
              </span>

              <h1 className="mt-3 text-[clamp(40px,7vw,72px)] font-semibold tracking-tight leading-[1.02] text-foreground">
                Leonard Iduwe<span className="text-accent">.</span>
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-lg sm:text-xl text-foreground-muted font-normal">
                  Frontend Engineer
                </span>
                <span className="text-foreground-subtle/40 text-lg">·</span>
                <span className="text-lg sm:text-xl text-foreground-muted font-normal">
                  Product Thinker
                </span>
                <span className="text-foreground-subtle/40 text-lg">·</span>
                <span className="text-lg sm:text-xl text-foreground-muted font-normal">
                  UX Designer
                </span>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.8, ease, delay: 0.15 }}
            >
              <motion.span
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-accent bg-accent/10 border border-accent/15 rounded-full"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.2 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                HNG 14 · Stage 4 Finalist
              </motion.span>
              <motion.span
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-foreground-muted bg-muted border border-border/50 rounded-full"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.2 }}
              >
                2.6 yrs · Frontend Web
              </motion.span>
              <motion.span
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-foreground-muted bg-muted border border-border/50 rounded-full"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.2 }}
              >
                Next.js · React · TypeScript
              </motion.span>
            </motion.div>

            <motion.p
              className="mt-8 text-base sm:text-lg leading-relaxed text-foreground-muted max-w-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.8, ease, delay: 0.3 }}
            >
              I build fast, accessible digital products. From concept to production, I craft interfaces that people genuinely enjoy using — with a focus on performance, design systems, and clean code.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.8, ease, delay: 0.45 }}
            >
              <motion.a href="#work" className="btn btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                </svg>
              </motion.a>
              <motion.a href="#contact" className="btn btn-ghost"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Get in Touch
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download
                className="btn btn-ghost"
                aria-label="Download resume"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Resume
              </motion.a>
            </motion.div>
          </div>
        </section>

        <div className="section-divider mx-auto max-w-5xl" />

        <ProjectList />

        <div className="section-divider mx-auto max-w-5xl" />

        <CaseStudySection />

        <div className="section-divider mx-auto max-w-5xl" />

        <ToolsSection />

        <div className="section-divider mx-auto max-w-5xl" />

        {/* Contact */}
        <section id="contact" className="py-24 sm:py-32 px-6">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.8, ease }}
            >
              <span className="section-label">Contact</span>
              <h2 className="section-title">Let&apos;s work together</h2>
              <p className="section-desc">
                I&apos;m currently available for freelance projects and full-time opportunities. If you have a project in mind or just want to say hello, I&apos;d love to hear from you.
              </p>
            </motion.div>

            <motion.div
              className="mt-10 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.8, ease, delay: 0.1 }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <motion.a
                  href="mailto:conceptsandcontexts@gmail.com"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send an email
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  download
                  className="btn btn-ghost"
                  aria-label="Download resume"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download Resume
                </motion.a>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <motion.a
                  href="https://github.com/elpresidentey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
                  aria-label="GitHub profile"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <GithubIcon />
                  <span className="font-medium">GitHub</span>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/iduwe-leonard-a84905227"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
                  aria-label="LinkedIn profile"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <LinkedinIcon />
                  <span className="font-medium">LinkedIn</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </motion.div>
    </main>
  );
}