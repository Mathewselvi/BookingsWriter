export const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzPk53tNWWdH-2FqH-tecV0MC4P8yG2ZqXHR4i3tOVrLRCNh-tlePm9qM6vwUsEJG8e/exec';

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
