import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaymentStatus } from '../../types/booking';

interface PaymentStatusPillProps {
  status: PaymentStatus;
}

export const PaymentStatusPill: React.FC<PaymentStatusPillProps> = React.memo(({ status }) => {
  const getPillStyles = (s: PaymentStatus) => {
    switch (s) {
      case 'Full Paid':
        return {
          bg: 'bg-success/15 border-success/30 text-success',
          dot: 'bg-success',
        };
      case 'Advance Paid':
        return {
          bg: 'bg-warning/15 border-warning/30 text-warning',
          dot: 'bg-warning',
        };
      case 'Remaining':
      default:
        return {
          bg: 'bg-danger/15 border-danger/30 text-danger',
          dot: 'bg-danger',
        };
    }
  };

  const currentStyles = getPillStyles(status);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        layout
        key={status}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2, ease: [0.28, 0.11, 0.32, 1] }}
        className={`inline-flex items-center gap-2 rounded-chip border px-3 py-1 text-xs font-medium ${currentStyles.bg}`}
      >
        <span className={`h-2 w-2 rounded-full animate-pulse ${currentStyles.dot}`} />
        <span>{status}</span>
      </motion.div>
    </AnimatePresence>
  );
});

PaymentStatusPill.displayName = 'PaymentStatusPill';
