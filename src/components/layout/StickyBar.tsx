import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';

interface StickyBarProps {
  isVisible: boolean;
  isSubmitting: boolean;
  onSave: () => void;
}

export const StickyBar: React.FC<StickyBarProps> = React.memo(({ isVisible, isSubmitting, onSave }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.28, 0.11, 0.32, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-surface/80 backdrop-blur-[20px] border-t border-separator p-4 shadow-modal pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <button
            type="button"
            onClick={onSave}
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2.5 rounded-button bg-apple-blue px-6 py-3.5 text-[17px] font-semibold text-white shadow-md active:scale-[0.98] disabled:opacity-70 transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Saving Booking...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Save Booking</span>
              </>
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

StickyBar.displayName = 'StickyBar';
