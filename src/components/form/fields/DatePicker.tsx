import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';

export interface Shortcut {
  label: string;
  onClick: () => void;
}

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  shortcuts?: Shortcut[];
}

const shakeVariant = {
  shake: {
    x: [0, -8, 8, -8, 8, 0],
    transition: { duration: 0.4 },
  },
};

export const DatePicker = React.memo(forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, name, required, error, shortcuts, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={name} className="text-sm font-semibold text-t1 flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-danger">*</span>}
        </label>

        <motion.div
          variants={shakeVariant}
          animate={error ? 'shake' : undefined}
          className="relative flex items-center w-full"
        >
          <input
            type="date"
            id={name}
            name={name}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            className={`apple-input pr-10 cursor-pointer ${
              error ? 'border-danger focus:border-danger ring-1 ring-danger' : ''
            } ${className}`}
            {...props}
          />

          <div className="absolute right-3.5 flex items-center text-t2 pointer-events-none">
            <Calendar className="h-5 w-5" />
          </div>
        </motion.div>

        {/* Shortcuts pills row */}
        {shortcuts && shortcuts.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {shortcuts.map((shortcut, idx) => (
              <button
                key={idx}
                type="button"
                onClick={shortcut.onClick}
                className="rounded-chip bg-surface-2 border border-separator px-2.5 py-1 text-xs font-medium text-t2 hover:bg-apple-blue/10 hover:text-apple-blue hover:border-apple-blue/30 transition-all active:scale-95"
              >
                {shortcut.label}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence>
          {error && (
            <motion.p
              id={`${name}-error`}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs text-danger font-medium mt-0.5"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
));

DatePicker.displayName = 'DatePicker';
