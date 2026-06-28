export type PaymentStatus = 'Full Paid' | 'Advance Paid' | 'Remaining';

export type BookingSource =
  | 'Walk In' | 'Airbnb' | 'B2B' | 'Booking.com' | 'Direct';

export type PropertyType =
  | 'Superior Room' | 'Deluxe Room' | 'Family Room' | 'Villa'
  | '1 Hut' | '2 Huts' | '3 Huts' | '4 Huts' | 'Full Property';

export interface BookingFormData {
  guestName:     string;
  phoneNumber:   string;
  checkinDate:   string;        // ISO YYYY-MM-DD
  checkoutDate:  string;
  propertyType:  PropertyType;
  totalAmount:   number;
  advancePaid:   number;
  paymentStatus: PaymentStatus;
  bookingSource: BookingSource;
  notes:         string;
}

export interface BookingPayload extends BookingFormData {
  bookingId:      string;        // BH-006
  numberOfNights: number;        // auto-calculated
  balanceAmount:  number;        // auto-calculated
  timestamp:      string;        // ISO 8601
}

export interface SheetsApiResponse {
  status:   'success' | 'error';
  message?: string;
}
