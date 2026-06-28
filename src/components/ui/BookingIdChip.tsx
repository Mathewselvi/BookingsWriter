import React from 'react';
import { Tag } from 'lucide-react';

interface BookingIdChipProps {
  label: string;
}

export const BookingIdChip: React.FC<BookingIdChipProps> = React.memo(({ label }) => {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-chip bg-apple-blue/10 px-3 py-1 text-xs font-semibold text-apple-blue border border-apple-blue/20 shadow-sm">
      <Tag className="h-3.5 w-3.5" />
      <span>Next ID: {label}</span>
    </div>
  );
});

BookingIdChip.displayName = 'BookingIdChip';
