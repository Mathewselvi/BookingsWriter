import { create } from 'zustand';

interface BookingUIState {
  isSubmitting: boolean;
  showSuccessModal: boolean;
  showErrorModal: boolean;
  lastBookingId: string | null;
  lastGuestName: string | null;
  errorMessage: string | null;

  setSubmitting: (v: boolean) => void;
  openSuccessModal: (id: string, name: string) => void;
  closeSuccessModal: () => void;
  openErrorModal: (msg: string) => void;
  closeErrorModal: () => void;
}

export const useBookingStore = create<BookingUIState>((set) => ({
  isSubmitting: false,
  showSuccessModal: false,
  showErrorModal: false,
  lastBookingId: null,
  lastGuestName: null,
  errorMessage: null,

  setSubmitting: (v) => set({ isSubmitting: v }),
  openSuccessModal: (id, name) =>
    set({
      showSuccessModal: true,
      lastBookingId: id,
      lastGuestName: name,
    }),
  closeSuccessModal: () => set({ showSuccessModal: false }),
  openErrorModal: (msg) =>
    set({
      showErrorModal: true,
      errorMessage: msg,
    }),
  closeErrorModal: () => set({ showErrorModal: false, errorMessage: null }),
}));
