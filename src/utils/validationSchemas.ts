import { z } from 'zod';
import { PROPERTY_TYPES, BOOKING_SOURCES, PAYMENT_STATUSES } from '../constants/bookingOptions';

export const bookingSchema = z.object({
  guestName: z.string().min(2, 'Min 2 characters').max(100),
  phoneNumber: z.string().regex(/^\+?[\d\s\-()]{7,15}$/, 'Invalid phone number (7-15 digits)'),
  checkinDate: z.string().min(1, 'Check-in date is required'),
  checkoutDate: z.string().min(1, 'Check-out date is required'),
  propertyType: z.enum(PROPERTY_TYPES),
  totalAmount: z.number({ invalid_type_error: 'Enter amount' })
                .positive('Must be greater than 0'),
  advancePaid: z.number().min(0).optional().default(0),
  paymentStatus: z.enum(PAYMENT_STATUSES),
  bookingSource: z.enum(BOOKING_SOURCES),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional().default(''),
}).refine(
  data => {
    if (!data.checkinDate || !data.checkoutDate) return true;
    return new Date(data.checkoutDate) > new Date(data.checkinDate);
  },
  { message: 'Check-out must be after check-in', path: ['checkoutDate'] }
);

export type BookingSchemaType = z.infer<typeof bookingSchema>;
