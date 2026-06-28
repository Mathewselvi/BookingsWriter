import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { BookingFormData } from '../../../types/booking';
import { PAYMENT_STATUSES } from '../../../constants/bookingOptions';
import { CurrencyInput } from '../fields/CurrencyInput';
import { FormSelect } from '../fields/FormSelect';
import { ReadonlyField } from '../fields/ReadonlyField';
import { PaymentStatusPill } from '../../ui/PaymentStatusPill';
import { formatCurrency } from '../../../utils/formatUtils';
import { CreditCard } from 'lucide-react';

interface PaymentSectionProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  balanceAmount: number;
  paymentStatus: BookingFormData['paymentStatus'];
}

export const PaymentSection: React.FC<PaymentSectionProps> = React.memo(({
  register,
  errors,
  balanceAmount,
  paymentStatus,
}) => {
  return (
    <section className="rounded-card border border-separator bg-surface p-6 sm:p-8 shadow-card transition-all mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-separator">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-apple-blue/10 text-apple-blue">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-t1">Payment Details</h3>
            <p className="text-xs text-t2">Financial breakdown and deposit tracking</p>
          </div>
        </div>
        {paymentStatus && <PaymentStatusPill status={paymentStatus} />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <CurrencyInput
          label="Total Amount"
          placeholder="0"
          required
          error={errors.totalAmount?.message}
          {...register('totalAmount', { valueAsNumber: true })}
        />

        <CurrencyInput
          label="Advance Paid"
          placeholder="0"
          error={errors.advancePaid?.message}
          {...register('advancePaid', { valueAsNumber: true })}
        />

        <ReadonlyField
          label="Balance Amount"
          value={formatCurrency(balanceAmount)}
          subtext={balanceAmount === 0 ? 'Fully settled' : 'Pending collection at resort'}
        />

        <FormSelect
          label="Payment Status"
          options={PAYMENT_STATUSES}
          error={errors.paymentStatus?.message}
          {...register('paymentStatus')}
        />
      </div>
    </section>
  );
});

PaymentSection.displayName = 'PaymentSection';
