'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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

// Optional intro video. Drop a file at public/intro.mp4 and set VIDEO_SRC to
// enable it. When null (default), the text animation is used. Video errors
// gracefully fall back to the text timers.
const VIDEO_SRC: string | null = null;

function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const dur = reduceMotion ? 0.01 : 1.2;
  const [fading, setFading] = useState(false);
  const [videoFailed, setVideoFailed] = useState(!VIDEO_SRC);
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);

  const safeComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  // Timer-based completion — reliable, never depends on animation callbacks.
  useEffect(() => {
    const HOLD = reduceMotion ? 400 : VIDEO_SRC && !videoFailed ? 6000 : 2200;
    const FADE = reduceMotion ? 200 : 500;
    const fadeTimer = setTimeout(() => setFading(true), HOLD);
    const doneTimer = setTimeout(safeComplete, HOLD + FADE);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [reduceMotion, safeComplete, videoFailed]);

  // Attempt muted autoplay; on failure fall back to text timers.
  useEffect(() => {
    if (!VIDEO_SRC || videoFailed) return;
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p) p.catch(() => setVideoFailed(true));
  }, [videoFailed]);

  const handleSkip = useCallback(() => {
    if (completedRef.current) return;
    setFading(true);
    setTimeout(safeComplete, 260);
  }, [safeComplete]);

  // Skip with Esc / Enter / Space
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleSkip]);

  const showVideo = !!VIDEO_SRC && !videoFailed;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex h-[100dvh] w-full flex-col items-center justify-center bg-background px-6"
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.5, ease }}
      style={{
        opacity: fading ? 0 : 1,
        transition: `opacity ${reduceMotion ? 0.2 : 0.5}s cubic-bezier(0.22,1,0.36,1)`,
        pointerEvents: fading ? 'none' : 'auto',
        paddingTop: 'max(4rem, env(safe-area-inset-top, 0px))',
        paddingBottom: 'max(4rem, env(safe-area-inset-bottom, 0px))',
      }}
      onClick={handleSkip}
    >
      {showVideo && (
        <video
          ref={videoRef}
          src={VIDEO_SRC!}
          muted
          playsInline
          autoPlay
          preload="auto"
          onEnded={handleSkip}
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div
        className={`relative flex w-full max-w-md flex-col items-center gap-4 sm:gap-5 ${
          showVideo
            ? 'bg-background/70 backdrop-blur-sm px-5 py-6 sm:px-8 rounded-2xl'
            : 'px-1'
        }`}
      >
        <div className="overflow-hidden">
          <motion.span
            className="block text-[clamp(2rem,10vw,3rem)] font-medium tracking-tight text-foreground"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: dur, ease }}
          >
            IEL<span className="text-accent">.</span>
          </motion.span>
        </div>

        <motion.div
          className="h-px bg-foreground"
          initial={{ width: 0 }}
          animate={{ width: 'min(12.5rem, 55vw)' }}
          transition={{ duration: dur, ease, delay: reduceMotion ? 0 : 0.3 }}
        />

        <motion.p
          className="w-full max-w-[18rem] sm:max-w-sm text-center text-[10px] sm:text-xs leading-relaxed tracking-[0.08em] sm:tracking-[0.12em] uppercase text-foreground-muted px-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0.01 : 1.0, ease, delay: reduceMotion ? 0 : 0.7 }}
        >
          <span className="flex flex-col gap-1 sm:hidden">
            <span>Frontend Engineer</span>
            <span>Product Thinker</span>
            <span>User Experience Designer</span>
          </span>
          <span className="hidden sm:inline">
            Frontend Engineer, Product Thinker and User Experience Designer
          </span>
        </motion.p>
      </div>

      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        className="absolute left-1/2 -translate-x-1/2 text-[10px] sm:text-xs tracking-widest uppercase text-foreground-subtle hover:text-foreground-muted transition-colors px-4 py-2 rounded-full border border-border/40 bg-muted/40 backdrop-blur whitespace-nowrap"
        style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 1.2, duration: 0.6 }}
        aria-label="Skip intro"
      >
        <span className="sm:hidden">Tap to skip</span>
        <span className="hidden sm:inline">Skip — press Esc</span>
      </motion.button>
    </motion.div>
  );
}

export default function Page() {
  // null = still checking sessionStorage (avoid intro/content flash)
  const [showIntro, setShowIntro] = useState<boolean | null>(null);
  const reduceMotion = useReducedMotion();
  const rafId = useRef<number | null>(null);
  const introDone = showIntro === false;

  // Show the intro once per session. ?intro=0 forces skip, ?intro=1 forces it.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('intro') === '0') {
        setShowIntro(false);
        return;
      }
      if (params.get('intro') === '1') {
        setShowIntro(true);
        return;
      }
      setShowIntro(!sessionStorage.getItem('iel-intro-seen'));
    } catch {
      setShowIntro(true);
    }
  }, []);

  const handleIntroDone = useCallback(() => {
    try {
      sessionStorage.setItem('iel-intro-seen', '1');
    } catch {
      /* ignore */
    }
    setShowIntro(false);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Keep hash targets (projects / contact) below the fixed weather + nav stack
      anchors: { offset: -128 },
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
    if (!introDone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [introDone]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <main className="min-h-screen bg-background text-foreground font-sans antialiased bg-noise">
      <AnimatePresence>
        {showIntro !== false && (
          showIntro === null ? (
            <div
              key="intro-gate"
              className="fixed inset-0 z-[9999] h-[100dvh] w-full bg-background"
              aria-hidden="true"
            />
          ) : (
            <IntroScreen key="intro" onComplete={handleIntroDone} />
          )
        )}
      </AnimatePresence>

      {introDone && (
        <>
          <WeatherWidget />
          <Header />

          {/* Hero — top padding clears the fixed weather bar + nav pill */}
          <section className="relative min-h-[100svh] flex items-start md:items-center pt-[var(--hero-offset)] pb-16 sm:pb-20">
            {/* Background orbs (clipped independently so hero copy is never cut off) */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="gradient-orb w-[600px] h-[600px] bg-accent -top-48 -right-48" />
              <div className="gradient-orb w-[400px] h-[400px] bg-accent bottom-0 -left-48" style={{ opacity: 0.04 }} />
            </div>

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
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-accent bg-accent/10 border border-accent/15 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  HNG 14 · Stage 4 Finalist
                </span>
                <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-foreground-muted bg-muted border border-border/50 rounded-full">
                  2.6 yrs · Full-Stack Web
                </span>
                <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-foreground-muted bg-muted border border-border/50 rounded-full">
                  Next.js · React · TypeScript
                </span>
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
                <a href="#work" className="btn btn-primary">
                  View Projects
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                  </svg>
                </a>
                <a href="#contact" className="btn btn-ghost">
                  Get in Touch
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="btn btn-ghost"
                  aria-label="Download resume"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Resume
                </a>
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
          <section id="contact" className="scroll-mt-[var(--hero-offset)] py-24 sm:py-32 px-6">
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
                  <a
                    href="mailto:conceptsandcontexts@gmail.com"
                    className="btn btn-primary"
                  >
                    Send an email
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    className="btn btn-ghost"
                    aria-label="Download resume"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download Resume
                  </a>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <a
                    href="https://github.com/elpresidentey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
                    aria-label="GitHub profile"
                  >
                    <GithubIcon />
                    <span className="font-medium">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/iduwe-leonard-a84905227"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
                    aria-label="LinkedIn profile"
                  >
                    <LinkedinIcon />
                    <span className="font-medium">LinkedIn</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          <Footer />
        </>
      )}
    </main>
  );
}