import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: (string | Option)[];
  required?: boolean;
  error?: string;
}

const shakeVariant = {
  shake: {
    x: [0, -8, 8, -8, 8, 0],
    transition: { duration: 0.4 },
  },
};

export const FormSelect = React.memo(forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, name, options, required, error, className = '', ...props }, ref) => {
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
          <select
            id={name}
            name={name}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            className={`apple-input appearance-none pr-10 cursor-pointer ${
              error ? 'border-danger focus:border-danger ring-1 ring-danger' : ''
            } ${className}`}
            {...props}
          >
            <option value="" disabled>
              Select an option...
            </option>
            {options.map((opt) => {
              const val = typeof opt === 'string' ? opt : opt.value;
              const lbl = typeof opt === 'string' ? opt : opt.label;
              return (
                <option key={val} value={val} className="bg-surface text-t1 py-2">
                  {lbl}
                </option>
              );
            })}
          </select>

          <div className="absolute right-3.5 flex items-center text-t2 pointer-events-none">
            <ChevronDown className="h-5 w-5" />
          </div>
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

FormSelect.displayName = 'FormSelect';
