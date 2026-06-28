import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { BookingFormData } from '../../../types/booking';
import { FormInput } from '../fields/FormInput';
import { Copy, Check, User, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

interface GuestSectionProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  phoneNumberValue: string;
}

export const GuestSection: React.FC<GuestSectionProps> = React.memo(({
  register,
  errors,
  phoneNumberValue,
}) => {
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleCopyPhone = () => {
    if (!phoneNumberValue) {
      toast.error('No phone number to copy');
      return;
    }
    navigator.clipboard.writeText(phoneNumberValue);
    setCopied(true);
    toast.success('Phone number copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="rounded-card border border-separator bg-surface p-6 sm:p-8 shadow-card transition-all">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-separator">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-apple-blue/10 text-apple-blue">
          <User className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-t1">Guest Information</h3>
          <p className="text-xs text-t2">Primary contact details for the resort stay</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormInput
          label="Guest Name"
          placeholder="e.g. Rahul Sharma"
          required
          error={errors.guestName?.message}
          {...register('guestName')}
        />

        <FormInput
          label="Phone Number"
          type="tel"
          placeholder="+91 98765 43210"
          required
          error={errors.phoneNumber?.message}
          prefixNode={<Phone className="h-4 w-4" />}
          suffixNode={
            <button
              type="button"
              onClick={handleCopyPhone}
              className="p-1.5 rounded-md hover:bg-separator text-t2 hover:text-apple-blue transition-colors focus:outline-none"
              title="Copy phone number"
              aria-label="Copy phone number"
            >
              {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            </button>
          }
          {...register('phoneNumber')}
        />
      </div>
    </section>
  );
});

GuestSection.displayName = 'GuestSection';
