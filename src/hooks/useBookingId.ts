import { useCallback } from 'react';
import { APP_CONFIG } from '../config';

const STORAGE_KEY = APP_CONFIG.storageKeys.nextId;
const MIN_ID = APP_CONFIG.minBookingId;

export function useBookingId() {
  const getNext = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? parseInt(stored, 10) : MIN_ID;
    return isNaN(parsed) ? MIN_ID : Math.max(MIN_ID, parsed);
  }, []);

  const peekLabel = useCallback(() => {
    return `#BH-${String(getNext()).padStart(3, '0')}`;
  }, [getNext]);

  const consume = useCallback(() => {
    const id = getNext();
    localStorage.setItem(STORAGE_KEY, String(id + 1));
    return `BH-${String(id).padStart(3, '0')}`;
  }, [getNext]);

  const rollback = useCallback(() => {
    const current = getNext();
    if (current > MIN_ID) {
      localStorage.setItem(STORAGE_KEY, String(current - 1));
    }
  }, [getNext]);

  return { peekLabel, consume, rollback };
}
