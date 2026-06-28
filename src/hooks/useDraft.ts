import { useState, useCallback, useEffect } from 'react';
import { BookingFormData } from '../types/booking';
import { APP_CONFIG } from '../config';

const STORAGE_KEY = APP_CONFIG.storageKeys.draft;
const EXPIRATION_MS = APP_CONFIG.draftExpirationDays * 24 * 60 * 60 * 1000;

interface DraftData {
  data: Partial<BookingFormData>;
  timestamp: number;
}

export function useDraft() {
  const [hasDraft, setHasDraft] = useState<boolean>(false);

  const checkDraft = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setHasDraft(false);
      return;
    }
    try {
      const parsed: DraftData = JSON.parse(stored);
      const isExpired = Date.now() - parsed.timestamp > EXPIRATION_MS;
      if (isExpired || !parsed.data || Object.keys(parsed.data).length === 0) {
        localStorage.removeItem(STORAGE_KEY);
        setHasDraft(false);
      } else {
        setHasDraft(true);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setHasDraft(false);
    }
  }, []);

  useEffect(() => {
    checkDraft();
  }, [checkDraft]);

  const saveDraft = useCallback((formData: Partial<BookingFormData>) => {
    // Check if form is essentially empty
    const isEmpty =
      !formData.guestName &&
      !formData.phoneNumber &&
      !formData.checkinDate &&
      !formData.checkoutDate &&
      !formData.totalAmount &&
      !formData.notes;

    if (isEmpty) {
      localStorage.removeItem(STORAGE_KEY);
      setHasDraft(false);
      return;
    }

    const payload: DraftData = {
      data: formData,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setHasDraft(true);
  }, []);

  const restoreDraft = useCallback((): Partial<BookingFormData> | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    try {
      const parsed: DraftData = JSON.parse(stored);
      if (Date.now() - parsed.timestamp <= EXPIRATION_MS) {
        return parsed.data;
      }
    } catch {
      // ignore JSON error
    }
    return null;
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasDraft(false);
  }, []);

  return { hasDraft, restoreDraft, clearDraft, saveDraft };
}
