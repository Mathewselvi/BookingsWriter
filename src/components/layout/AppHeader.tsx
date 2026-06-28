import React from 'react';
import { motion } from 'framer-motion';
import { useDateTime } from '../../hooks/useDateTime';
import { useBookingId } from '../../hooks/useBookingId';
import { ThemeToggle } from '../theme/ThemeToggle';
import { BookingIdChip } from '../ui/BookingIdChip';
import { Clock, Search } from 'lucide-react';

interface AppHeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenSearch: () => void;
}

const headerVariant = {
  hidden: { y: -52, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.28, 0.11, 0.32, 1] },
  },
};

export const AppHeader: React.FC<AppHeaderProps> = React.memo(({ theme, onToggleTheme, onOpenSearch }) => {
  const { formattedTime, formattedDate } = useDateTime();
  const { peekLabel } = useBookingId();

  return (
    <motion.header
      variants={headerVariant}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-40 flex h-[52px] w-full items-center justify-between border-b border-separator bg-surface/80 px-4 sm:px-6 backdrop-blur-[20px] backdrop-saturate-[180%] transition-colors shadow-sm"
    >
      {/* Brand & Logo */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black shadow-sm text-lg select-none">
          🏝️
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-0 sm:gap-2">
          <span className="text-sm font-bold tracking-tight text-t1 leading-tight">
            Beyond Heaven
          </span>
          <span className="text-[11px] sm:text-xs font-medium text-t2 leading-tight">
            Booking Manager
          </span>
        </div>
      </div>

      {/* Center / Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search / Manage Button */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="inline-flex items-center gap-1.5 rounded-chip bg-apple-blue/10 hover:bg-apple-blue/20 text-apple-blue px-3 py-1.5 text-xs font-semibold transition-all active:scale-95"
          title="Search or Delete Bookings"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Lookup</span>
        </button>

        {/* Next ID Chip (hidden on very small screens if tight) */}
        <div className="hidden xs:block">
          <BookingIdChip label={peekLabel()} />
        </div>

        {/* Live Clock */}
        <div className="hidden md:flex items-center gap-1.5 rounded-chip bg-surface-2 px-2.5 py-1 text-xs font-mono text-t2 border border-separator/60">
          <Clock className="h-3.5 w-3.5 text-apple-blue animate-pulse" />
          <span className="font-semibold text-t1">{formattedTime}</span>
          <span className="text-t3 hidden lg:inline">| {formattedDate}</span>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </motion.header>
  );
});

AppHeader.displayName = 'AppHeader';
