import React from 'react';
import { Command } from 'lucide-react';

export const KeyboardShortcutsCard: React.FC = React.memo(() => {
  const shortcuts = [
    { keys: ['Ctrl / ⌘', 'S'], label: 'Save Booking' },
    { keys: ['Ctrl / ⌘', 'D'], label: 'Reset Form' },
    { keys: ['Ctrl / ⌘', 'T'], label: 'Toggle Theme' },
  ];

  return (
    <div className="rounded-card border border-separator bg-surface p-5 shadow-card mt-8">
      <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-t1">
        <Command className="h-4 w-4 text-apple-blue" />
        <span>Keyboard Shortcuts</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {shortcuts.map((s, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-input bg-surface-2 px-3.5 py-2.5 text-xs text-t2 border border-separator/50"
          >
            <span>{s.label}</span>
            <div className="flex items-center gap-1">
              {s.keys.map((k, kIdx) => (
                <kbd
                  key={kIdx}
                  className="rounded bg-surface px-1.5 py-0.5 font-mono font-semibold text-t1 shadow-sm border border-separator"
                >
                  {k}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

KeyboardShortcutsCard.displayName = 'KeyboardShortcutsCard';
