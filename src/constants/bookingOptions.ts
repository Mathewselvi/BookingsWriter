import { PropertyType, BookingSource, PaymentStatus } from '../types/booking';

export const PROPERTY_TYPES: [PropertyType, ...PropertyType[]] = [
  'Superior Room',
  'Deluxe Room',
  'Family Room',
  'Villa',
  '1 Hut',
  '2 Huts',
  '3 Huts',
  '4 Huts',
  'Full Property',
];

export const BOOKING_SOURCES: [BookingSource, ...BookingSource[]] = [
  'Walk In',
  'Airbnb',
  'B2B',
  'Booking.com',
  'Direct',
];

export const PAYMENT_STATUSES: [PaymentStatus, ...PaymentStatus[]] = [
  'Full Paid',
  'Advance Paid',
  'Remaining',
];
