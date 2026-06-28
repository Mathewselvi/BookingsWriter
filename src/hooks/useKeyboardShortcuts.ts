import { useEffect } from 'react';

interface ShortcutHandlers {
  onSubmit: () => void;
  onClear: () => void;
  onToggleTheme: () => void;
}

export function useKeyboardShortcuts({
  onSubmit,
  onClear,
  onToggleTheme,
}: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        if (key === 's') {
          e.preventDefault();
          onSubmit();
        } else if (key === 'd') {
          e.preventDefault();
          onClear();
        } else if (key === 't') {
          e.preventDefault();
          onToggleTheme();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSubmit, onClear, onToggleTheme]);
}
