import { differenceInDays, parseISO, format, addDays, addWeeks, nextSaturday, isSaturday, isSunday } from 'date-fns';

export function calculateNights(checkinDate: string, checkoutDate: string): number {
  if (!checkinDate || !checkoutDate) return 0;
  try {
    const start = parseISO(checkinDate);
    const end = parseISO(checkoutDate);
    const nights = differenceInDays(end, start);
    return isNaN(nights) ? 0 : Math.max(0, nights);
  } catch {
    return 0;
  }
}

export function getTodayISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getTomorrowISO(baseDate?: string): string {
  const base = baseDate ? parseISO(baseDate) : new Date();
  return format(addDays(base, 1), 'yyyy-MM-dd');
}

export function getThisWeekendISO(): string {
  const today = new Date();
  if (isSaturday(today) || isSunday(today)) {
    return format(today, 'yyyy-MM-dd');
  }
  return format(nextSaturday(today), 'yyyy-MM-dd');
}

export function getPlusDaysISO(baseDate: string, days: number): string {
  const base = baseDate ? parseISO(baseDate) : new Date();
  return format(addDays(base, days), 'yyyy-MM-dd');
}

export function getPlusWeeksISO(baseDate: string, weeks: number): string {
  const base = baseDate ? parseISO(baseDate) : new Date();
  return format(addWeeks(base, weeks), 'yyyy-MM-dd');
}

export function formatDisplayDate(isoDateString: string): string {
  if (!isoDateString) return '—';
  try {
    return format(parseISO(isoDateString), 'dd MMM yyyy');
  } catch {
    return isoDateString;
  }
}
