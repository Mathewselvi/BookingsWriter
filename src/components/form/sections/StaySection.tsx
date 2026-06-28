import React from 'react';
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
import { BookingFormData } from '../../../types/booking';
import { PROPERTY_TYPES } from '../../../constants/bookingOptions';
import { DatePicker, Shortcut } from '../fields/DatePicker';
import { FormSelect } from '../fields/FormSelect';
import { ReadonlyField } from '../fields/ReadonlyField';
import { CalendarDays } from 'lucide-react';
import {
  getTodayISO,
  getTomorrowISO,
  getThisWeekendISO,
  getPlusDaysISO,
  getPlusWeeksISO,
} from '../../../utils/dateUtils';

interface StaySectionProps {
  register: UseFormRegister<BookingFormData>;
  setValue: UseFormSetValue<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  checkinValue: string;
  numberOfNights: number;
}

export const StaySection: React.FC<StaySectionProps> = React.memo(({
  register,
  setValue,
  errors,
  checkinValue,
  numberOfNights,
}) => {
  const checkinShortcuts: Shortcut[] = [
    {
      label: 'Today',
      onClick: () => setValue('checkinDate', getTodayISO(), { shouldValidate: true }),
    },
    {
      label: 'Tomorrow',
      onClick: () => setValue('checkinDate', getTomorrowISO(), { shouldValidate: true }),
    },
    {
      label: 'This Weekend',
      onClick: () => setValue('checkinDate', getThisWeekendISO(), { shouldValidate: true }),
    },
  ];

  const checkoutShortcuts: Shortcut[] = [
    {
      label: 'Tomorrow',
      onClick: () =>
        setValue('checkoutDate', getTomorrowISO(checkinValue), { shouldValidate: true }),
    },
    {
      label: '+2 Days',
      onClick: () =>
        setValue('checkoutDate', getPlusDaysISO(checkinValue, 2), { shouldValidate: true }),
    },
    {
      label: '+1 Week',
      onClick: () =>
        setValue('checkoutDate', getPlusWeeksISO(checkinValue, 1), { shouldValidate: true }),
    },
  ];

  return (
    <section className="rounded-card border border-separator bg-surface p-6 sm:p-8 shadow-card transition-all mt-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-separator">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-apple-blue/10 text-apple-blue">
          <CalendarDays className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-t1">Stay Details</h3>
          <p className="text-xs text-t2">Check-in schedule and accommodation selection</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <DatePicker
          label="Check-in Date"
          required
          error={errors.checkinDate?.message}
          shortcuts={checkinShortcuts}
          {...register('checkinDate')}
        />

        <DatePicker
          label="Check-out Date"
          required
          error={errors.checkoutDate?.message}
          shortcuts={checkoutShortcuts}
          {...register('checkoutDate')}
        />

        <ReadonlyField
          label="Number of Nights"
          value={numberOfNights > 0 ? `${numberOfNights} ${numberOfNights === 1 ? 'Night' : 'Nights'}` : '—'}
          subtext={numberOfNights > 0 ? 'Derived from dates' : undefined}
        />

        <FormSelect
          label="Property / Room Type"
          required
          options={PROPERTY_TYPES}
          error={errors.propertyType?.message}
          {...register('propertyType')}
        />
      </div>
    </section>
  );
});

StaySection.displayName = 'StaySection';
