'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="pointer-events-none fixed left-0 right-0 z-50 top-[var(--header-stack-top)]">
      <div className="mx-auto max-w-5xl px-4 pt-3 sm:px-6 sm:pt-4">
        <motion.nav
          className="pointer-events-auto flex items-center justify-between gap-2 px-3 py-2 sm:px-5 sm:py-2.5 bg-card/80 backdrop-blur-xl border border-border/50 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.25)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="/"
            className="shrink-0 text-sm font-semibold tracking-tight text-foreground hover:opacity-70 transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm pl-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            leonard<span className="text-accent text-xl">.</span>
          </motion.a>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <motion.a
              href="#work"
              className="nav-link px-2.5 py-1.5 sm:px-3 rounded-full hover:bg-muted transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              projects
            </motion.a>

            <motion.a
              href="#contact"
              className="nav-link px-2.5 py-1.5 sm:px-3 rounded-full hover:bg-muted transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              contact
            </motion.a>

            <motion.button
              onClick={toggleTheme}
              className="ml-0.5 sm:ml-1 p-2 rounded-full text-foreground-muted hover:text-foreground hover:bg-muted transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              aria-label="Toggle theme"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              whileTap={{ scale: 0.9 }}
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Moon className="w-3.5 h-3.5" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}