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
    <header className="fixed top-9 left-0 right-0 z-50">
      <div className="mx-auto max-w-5xl px-6 pt-4">
        <motion.nav
          className="flex items-center justify-between px-5 py-2.5 bg-card/80 backdrop-blur-xl border border-border/50 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.25)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="/"
            className="text-sm font-semibold tracking-tight text-foreground hover:opacity-70 transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm pl-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            leonard<span className="text-accent text-xl">.</span>
          </motion.a>

          <div className="flex items-center gap-1">
            <motion.a
              href="#work"
              className="nav-link px-3 py-1.5 rounded-full hover:bg-muted transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              projects
            </motion.a>

            <motion.a
              href="#contact"
              className="nav-link px-3 py-1.5 rounded-full hover:bg-muted transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              contact
            </motion.a>

            <motion.button
              onClick={toggleTheme}
              className="ml-1 p-2 rounded-full text-foreground-muted hover:text-foreground hover:bg-muted transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              aria-label="Toggle theme"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                key={resolvedTheme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}