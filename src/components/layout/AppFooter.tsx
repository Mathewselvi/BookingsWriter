import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const AppFooter: React.FC = React.memo(() => {
  return (
    <footer className="mt-16 border-t border-separator bg-surface-2 py-8 text-xs text-t2 transition-colors">
      <div className="mx-auto flex max-w-[700px] flex-col items-center justify-between gap-4 px-4 sm:flex-row text-center sm:text-left">
        <div>
          <p className="font-semibold text-t1">Beyond Heaven Resort © {new Date().getFullYear()}</p>
          <p className="mt-0.5 text-t3">Internal Booking Management Portal • v1.0.0 Pro</p>
        </div>

        <div className="flex items-center gap-1.5 rounded-chip bg-success/10 px-3 py-1 text-success font-medium border border-success/20">
          <ShieldCheck className="h-4 w-4" />
          <span>Production Ready • AES-256 SSL</span>
        </div>
      </div>
    </footer>
  );
});

AppFooter.displayName = 'AppFooter';
