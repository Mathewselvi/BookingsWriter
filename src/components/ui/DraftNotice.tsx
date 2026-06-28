import React from 'react';
import { Save, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DraftNoticeProps {
  hasDraft: boolean;
  onClearDraft: () => void;
}

export const DraftNotice: React.FC<DraftNoticeProps> = React.memo(({ hasDraft, onClearDraft }) => {
  return (
    <AnimatePresence>
      {hasDraft && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.28, 0.11, 0.32, 1] }}
          className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-card border border-apple-blue/20 bg-apple-blue/5 p-4 text-sm text-t1 shadow-sm"
        >
          <div className="flex items-center gap-2.5 font-medium">
            <Save className="h-4 w-4 text-apple-blue" />
            <span>Unsaved draft restored from your last session.</span>
          </div>
          <button
            type="button"
            onClick={onClearDraft}
            className="inline-flex items-center gap-1.5 rounded-button bg-surface px-3 py-1.5 text-xs font-medium text-danger shadow-sm border border-separator hover:bg-danger/10 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Discard Draft</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

DraftNotice.displayName = 'DraftNotice';
