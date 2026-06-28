export const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycby5jVq7zZdEdLGh_peBwGSC6ULeZiJJUxKGThOIHFw3xa_UzFDSkXyn0Ua25TwsneZ-/exec';

export const APP_CONFIG = {
  resortName: 'Beyond Heaven Resort',
  appTitle: 'Booking Manager',
  storageKeys: {
    nextId: 'bh_next_id',
    draft: 'bh_booking_draft',
    theme: 'bh_theme',
  },
  minBookingId: 6,
  draftExpirationDays: 7,
};
