import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
}

const shakeVariant = {
  shake: {
    x: [0, -8, 8, -8, 8, 0],
    transition: { duration: 0.4 },
  },
};

export const CurrencyInput = React.memo(forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ label, name, required, error, className = '', onPaste, ...props }, ref) => {
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (onPaste) onPaste(e);
      const pasted = e.clipboardData.getData('text');
      if (/[^\d]/.test(pasted)) {
        e.preventDefault();
        const clean = pasted.replace(/[^\d]/g, '');
        // insert clean text
        document.execCommand('insertText', false, clean);
      }
    };

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
          <span className="absolute left-4 font-semibold text-t2 pointer-events-none select-none text-[17px]">
            ₹
          </span>

          <input
            type="number"
            inputMode="numeric"
            id={name}
            name={name}
            ref={ref}
            onPaste={handlePaste}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            className={`apple-input pl-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              error ? 'border-danger focus:border-danger ring-1 ring-danger' : ''
            } ${className}`}
            {...props}
          />
        </motion.div>

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

CurrencyInput.displayName = 'CurrencyInput';
