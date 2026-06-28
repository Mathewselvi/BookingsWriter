import React from 'react';

interface ReadonlyFieldProps {
  label: string;
  value: string | number | undefined | null;
  subtext?: string;
}

export const ReadonlyField: React.FC<ReadonlyFieldProps> = React.memo(({ label, value, subtext }) => {
  const displayValue = value !== undefined && value !== null && value !== '' && !isNaN(Number(value)) ? value : (value || '—');

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-t1">{label}</span>
        <span className="rounded-chip bg-apple-blue/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-apple-blue border border-apple-blue/20 select-none">
          AUTO
        </span>
      </div>

      <div className="flex min-h-[48px] w-full items-center justify-between rounded-input border border-dashed border-separator bg-surface-2 px-4 py-3 text-[17px] font-semibold text-t1 shadow-inner select-none">
        <span>{displayValue}</span>
        {subtext && <span className="text-xs font-normal text-t3">{subtext}</span>}
      </div>
    </div>
  );
});

ReadonlyField.displayName = 'ReadonlyField';
