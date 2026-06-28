import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message?: string | null;
  bookingId?: string | null;
  guestName?: string | null;
  onNewBooking?: () => void;
}

const backdropVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariant = {
  hidden: { opacity: 0, scale: 0.88, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.26, ease: [0.28, 0.11, 0.32, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.88,
    y: 24,
    transition: { duration: 0.16, ease: [0.28, 0.11, 0.32, 1] },
  },
};

const popInVariant = {
  hidden: { scale: 0.4, opacity: 0 },
  visible: {
    scale: [0.4, 1.1, 1],
    opacity: 1,
    transition: { duration: 0.44, ease: [0.28, 0.11, 0.32, 1] },
  },
};

export const Modal: React.FC<ModalProps> = React.memo(({
  isOpen,
  onClose,
  type,
  title,
  message,
  bookingId,
  guestName,
  onNewBooking,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-[12px] transition-opacity"
          />

          {/* Card */}
          <motion.div
            variants={modalVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full sm:max-w-md rounded-t-card sm:rounded-card bg-surface p-6 sm:p-8 shadow-modal border border-separator text-t1 overflow-hidden"
          >
            {/* Drag handle indicator on mobile */}
            <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-separator sm:hidden" />

            <button
              onClick={onClose}
              type="button"
              className="absolute right-5 top-5 rounded-full p-2 text-t2 hover:bg-separator transition-colors focus-visible:ring-4 focus-visible:ring-apple-blue/25"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              {type === 'success' ? (
                <motion.div variants={popInVariant} initial="hidden" animate="visible" className="mb-4">
                  <CheckCircle2 className="h-16 w-16 text-success" />
                </motion.div>
              ) : (
                <motion.div variants={popInVariant} initial="hidden" animate="visible" className="mb-4">
                  <AlertCircle className="h-16 w-16 text-danger" />
                </motion.div>
              )}

              <h2 id="modal-title" className="text-2xl font-bold tracking-tight text-t1 mb-2">
                {title}
              </h2>

              {type === 'success' && bookingId && (
                <div className="my-3 inline-flex items-center gap-2 rounded-chip bg-success/10 px-4 py-1.5 text-sm font-semibold text-success border border-success/20">
                  <span>ID: #{bookingId}</span>
                </div>
              )}

              {type === 'success' && guestName && (
                <p className="text-sm text-t2 mb-6">
                  Booking confirmed for <span className="font-semibold text-t1">{guestName}</span>. All details have been synced to Google Sheets.
                </p>
              )}

              {type === 'error' && message && (
                <p className="text-sm text-danger mb-6 bg-danger/10 p-3 rounded-input border border-danger/20 w-full">
                  {message}
                </p>
              )}

              <div className="flex w-full flex-col gap-3 sm:flex-row">
                {type === 'success' && onNewBooking ? (
                  <button
                    type="button"
                    onClick={() => {
                      onNewBooking();
                      onClose();
                    }}
                    className="w-full rounded-button bg-apple-blue py-3.5 px-6 text-[17px] font-semibold text-white shadow-md hover:bg-apple-blue-hover transition-all focus-visible:ring-4 focus-visible:ring-apple-blue/25"
                  >
                    New Booking
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-button bg-apple-blue py-3.5 px-6 text-[17px] font-semibold text-white shadow-md hover:bg-apple-blue-hover transition-all focus-visible:ring-4 focus-visible:ring-apple-blue/25"
                  >
                    {type === 'success' ? 'Done' : 'Try Again'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

Modal.displayName = 'Modal';
