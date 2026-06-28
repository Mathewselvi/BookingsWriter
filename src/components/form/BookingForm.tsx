import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookingFormData, BookingPayload } from '../../types/booking';
import { bookingSchema } from '../../utils/validationSchemas';
import { calculateNights, getTodayISO, getTomorrowISO } from '../../utils/dateUtils';
import { saveBookingToSheet } from '../../services/sheetsService';
import { useBookingStore } from '../../store/bookingStore';
import { useBookingId } from '../../hooks/useBookingId';
import { useDraft } from '../../hooks/useDraft';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useStickyBar } from '../../hooks/useStickyBar';
import { GuestSection } from './sections/GuestSection';
import { StaySection } from './sections/StaySection';
import { PaymentSection } from './sections/PaymentSection';
import { BookingInfoSection } from './sections/BookingInfoSection';
import { DraftNotice } from '../ui/DraftNotice';
import { StickyBar } from '../layout/StickyBar';
import { Loader2, RotateCcw, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_DEFAULT_VALUES: BookingFormData = {
  guestName: '',
  phoneNumber: '',
  checkinDate: getTodayISO(),
  checkoutDate: getTomorrowISO(),
  propertyType: 'Deluxe Room',
  totalAmount: 0,
  advancePaid: 0,
  paymentStatus: 'Remaining',
  bookingSource: 'Direct',
  notes: '',
};

interface BookingFormProps {
  onToggleTheme: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onToggleTheme }) => {
  const { setSubmitting, isSubmitting, openSuccessModal, openErrorModal } = useBookingStore();
  const { consume, rollback } = useBookingId();
  const { hasDraft, restoreDraft, clearDraft, saveDraft } = useDraft();
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const { observerRef, isStickyBarVisible } = useStickyBar<HTMLButtonElement>();

  // Attach observerRef to submitButtonRef
  const setButtonRef = useCallback((node: HTMLButtonElement | null) => {
    submitButtonRef.current = node;
    observerRef.current = node;
  }, [observerRef]);

  const restoredData = useMemo(() => restoreDraft(), [restoreDraft]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: restoredData ? { ...INITIAL_DEFAULT_VALUES, ...restoredData } : INITIAL_DEFAULT_VALUES,
  });

  const checkin = watch('checkinDate');
  const checkout = watch('checkoutDate');
  const total = watch('totalAmount');
  const advance = watch('advancePaid');
  const phoneNumber = watch('phoneNumber');
  const notes = watch('notes');
  const paymentStatus = watch('paymentStatus');

  const numberOfNights = useMemo(() => calculateNights(checkin, checkout), [checkin, checkout]);
  const balanceAmount = useMemo(() => {
    const t = isNaN(total) ? 0 : total;
    const a = isNaN(advance) ? 0 : advance;
    return Math.max(0, t - a);
  }, [total, advance]);

  // Auto-calculation logic for paymentStatus
  useEffect(() => {
    const t = isNaN(total) ? 0 : total;
    const a = isNaN(advance) ? 0 : advance;
    const bal = Math.max(0, t - a);

    let nextStatus: BookingFormData['paymentStatus'] = 'Remaining';
    if (t > 0 && bal === 0) {
      nextStatus = 'Full Paid';
    } else if (a > 0 && bal > 0) {
      nextStatus = 'Advance Paid';
    } else {
      nextStatus = 'Remaining';
    }

    setValue('paymentStatus', nextStatus, { shouldValidate: false });
  }, [total, advance, setValue]);

  // Save draft on every change
  const allValues = watch();
  useEffect(() => {
    if (!isSubmitting) {
      saveDraft(allValues);
    }
  }, [allValues, isSubmitting, saveDraft]);

  const handleClearForm = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all form fields?')) {
      reset(INITIAL_DEFAULT_VALUES);
      clearDraft();
      toast.success('Form cleared');
    }
  }, [reset, clearDraft]);

  const onValidSubmit = useCallback(
    async (data: BookingFormData) => {
      setSubmitting(true);
      const bookingId = consume();

      const payload: BookingPayload = {
        ...data,
        bookingId,
        numberOfNights,
        balanceAmount,
        timestamp: new Date().toISOString(),
      };

      const result = await saveBookingToSheet(payload);

      if (result.status === 'success') {
        clearDraft();
        reset(INITIAL_DEFAULT_VALUES);
        openSuccessModal(bookingId, data.guestName);
        toast.success(`Booking #${bookingId} saved successfully!`);
      } else {
        rollback();
        openErrorModal(result.message || 'Failed to submit booking to sheet.');
        toast.error('Failed to save booking');
      }

      setSubmitting(false);
    },
    [
      setSubmitting,
      consume,
      numberOfNights,
      balanceAmount,
      clearDraft,
      reset,
      openSuccessModal,
      rollback,
      openErrorModal,
    ]
  );

  const onInvalidSubmit = useCallback(() => {
    toast.error('Please fix the validation errors marked in red.');
    // Find first error and scroll to focus
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstKey = errorKeys[0];
      const element = document.getElementById(firstKey);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
  }, [errors]);

  const triggerSubmit = useCallback(() => {
    handleSubmit(onValidSubmit, onInvalidSubmit)();
  }, [handleSubmit, onValidSubmit, onInvalidSubmit]);

  useKeyboardShortcuts({
    onSubmit: triggerSubmit,
    onClear: handleClearForm,
    onToggleTheme,
  });

  const handleDiscardDraft = useCallback(() => {
    clearDraft();
    reset(INITIAL_DEFAULT_VALUES);
    toast.success('Draft discarded');
  }, [clearDraft, reset]);

  return (
    <form onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)} className="w-full">
      <DraftNotice hasDraft={hasDraft} onClearDraft={handleDiscardDraft} />

      <GuestSection register={register} errors={errors} phoneNumberValue={phoneNumber} />
      <StaySection
        register={register}
        setValue={setValue}
        errors={errors}
        checkinValue={checkin}
        numberOfNights={numberOfNights}
      />
      <PaymentSection
        register={register}
        errors={errors}
        balanceAmount={balanceAmount}
        paymentStatus={paymentStatus}
      />
      <BookingInfoSection register={register} errors={errors} notesValue={notes} />

      {/* Action Buttons Row */}
      <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-6 border-t border-separator">
        <button
          type="button"
          onClick={handleClearForm}
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-button bg-surface-2 px-6 py-3.5 text-[17px] font-semibold text-t2 border border-separator hover:bg-separator transition-all focus-visible:ring-4 focus-visible:ring-apple-blue/25 disabled:opacity-50"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset Form</span>
        </button>

        <button
          ref={setButtonRef}
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-button bg-apple-blue px-8 py-3.5 text-[17px] font-semibold text-white shadow-md hover:bg-apple-blue-hover transition-all focus-visible:ring-4 focus-visible:ring-apple-blue/25 active:scale-[0.98] disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Saving Booking...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Save Booking</span>
            </>
          )}
        </button>
      </div>

      {/* Sticky Bar for Mobile */}
      <StickyBar
        isVisible={isStickyBarVisible}
        isSubmitting={isSubmitting}
        onSave={triggerSubmit}
      />
    </form>
  );
};
