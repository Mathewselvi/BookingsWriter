import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  prefixNode?: React.ReactNode;
  suffixNode?: React.ReactNode;
}

const shakeVariant = {
  shake: {
    x: [0, -8, 8, -8, 8, 0],
    transition: { duration: 0.4 },
  },
};

export const FormInput = React.memo(forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, required, error, prefixNode, suffixNode, className = '', ...props }, ref) => {
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
          {prefixNode && (
            <div className="absolute left-3.5 flex items-center text-t2 pointer-events-none">
              {prefixNode}
            </div>
          )}

          <input
            id={name}
            name={name}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            className={`apple-input ${prefixNode ? 'pl-10' : ''} ${suffixNode ? 'pr-12' : ''} ${
              error ? 'border-danger focus:border-danger ring-1 ring-danger' : ''
            } ${className}`}
            {...props}
          />

          {suffixNode && (
            <div className="absolute right-3 flex items-center text-t2">
              {suffixNode}
            </div>
          )}
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

FormInput.displayName = 'FormInput';
