import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  maxLength?: number;
}

const shakeVariant = {
  shake: {
    x: [0, -8, 8, -8, 8, 0],
    transition: { duration: 0.4 },
  },
};

export const FormTextarea = React.memo(forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, name, required, error, maxLength = 500, value = '', className = '', ...props }, ref) => {
    const stringVal = String(value || '');
    const charCount = stringVal.length;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex items-center justify-between">
          <label htmlFor={name} className="text-sm font-semibold text-t1 flex items-center gap-1">
            <span>{label}</span>
            {required && <span className="text-danger">*</span>}
          </label>
          {maxLength && (
            <span className={`text-xs font-mono ${charCount > maxLength ? 'text-danger font-bold' : 'text-t3'}`}>
              {charCount} / {maxLength}
            </span>
          )}
        </div>

        <motion.div
          variants={shakeVariant}
          animate={error ? 'shake' : undefined}
          className="relative w-full"
        >
          <textarea
            id={name}
            name={name}
            ref={ref}
            value={value}
            maxLength={maxLength}
            rows={4}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            className={`apple-input py-3 min-h-[100px] resize-y ${
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

FormTextarea.displayName = 'FormTextarea';
