import React from 'react';
import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OfflineBannerProps {
  isOnline: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = React.memo(({ isOnline }) => {
  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -20 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.28, 0.11, 0.32, 1] }}
          className="bg-danger text-white overflow-hidden shadow-md"
          role="alert"
          aria-live="assertive"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-sm font-medium">
            <WifiOff className="h-4 w-4 animate-bounce" />
            <span>You are currently offline. Changes will be saved locally in your draft.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

OfflineBanner.displayName = 'OfflineBanner';
