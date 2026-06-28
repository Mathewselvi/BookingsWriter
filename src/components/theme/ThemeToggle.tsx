import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      type="button"
      aria-label="Toggle color theme"
      title="Toggle theme (Ctrl+T)"
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-t1 outline-none transition-colors hover:bg-separator focus-visible:ring-4 focus-visible:ring-apple-blue/25"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.div
            key="light"
            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2, ease: [0.28, 0.11, 0.32, 1] }}
          >
            <Sun className="h-5 w-5 text-warning" />
          </motion.div>
        ) : (
          <motion.div
            key="dark"
            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2, ease: [0.28, 0.11, 0.32, 1] }}
          >
            <Moon className="h-5 w-5 text-apple-blue" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
