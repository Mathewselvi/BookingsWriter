import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { BookingFormData } from '../../../types/booking';
import { BOOKING_SOURCES } from '../../../constants/bookingOptions';
import { FormSelect } from '../fields/FormSelect';
import { FormTextarea } from '../fields/FormTextarea';
import { Info } from 'lucide-react';

interface BookingInfoSectionProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  notesValue: string;
}

export const BookingInfoSection: React.FC<BookingInfoSectionProps> = React.memo(({
  register,
  errors,
  notesValue,
}) => {
  return (
    <section className="rounded-card border border-separator bg-surface p-6 sm:p-8 shadow-card transition-all mt-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-separator">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-apple-blue/10 text-apple-blue">
          <Info className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-t1">Booking Source & Notes</h3>
          <p className="text-xs text-t2">Origin channel and special guest preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <FormSelect
          label="Booking Source"
          options={BOOKING_SOURCES}
          error={errors.bookingSource?.message}
          {...register('bookingSource')}
        />

        <FormTextarea
          label="Special Notes & Requests"
          placeholder="Enter any guest dietary requirements, check-in preferences, or internal remarks..."
          maxLength={500}
          value={notesValue}
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>
    </section>
  );
});

BookingInfoSection.displayName = 'BookingInfoSection';
