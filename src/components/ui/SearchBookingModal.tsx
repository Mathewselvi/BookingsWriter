import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchBookingInSheet, deleteBookingInSheet } from '../../services/sheetsService';
import toast from 'react-hot-toast';
import { Search, Trash2, X, Loader2, Calendar, Phone, Home, DollarSign, Tag, FileText } from 'lucide-react';

interface SearchBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBookingModal: React.FC<SearchBookingModalProps> = React.memo(({ isOpen, onClose }) => {
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [booking, setBooking] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchId.trim()) {
      toast.error('Please enter a Booking ID');
      return;
    }

    setLoading(true);
    setError(null);
    setBooking(null);

    const result = await searchBookingInSheet(searchId.trim());
    setLoading(false);

    if (result.status === 'success' && result.data) {
      setBooking(result.data);
    } else {
      setError(result.message || 'No booking found matching that ID.');
    }
  }, [searchId]);

  const handleDelete = useCallback(async () => {
    if (!booking || !booking.bookingId) return;
    if (!window.confirm(`Are you sure you want to permanently delete ${booking.bookingId} (${booking.guestName})? This cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    const result = await deleteBookingInSheet(booking.bookingId);
    setDeleting(false);

    if (result.status === 'success') {
      toast.success(result.message || 'Booking deleted successfully');
      setBooking(null);
      setSearchId('');
    } else {
      toast.error(result.message || 'Failed to delete booking');
    }
  }, [booking]);

  const handleClose = () => {
    setSearchId('');
    setBooking(null);
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
            className="relative w-full max-w-lg rounded-[24px] bg-surface p-6 sm:p-8 shadow-2xl border border-separator flex flex-col gap-6 overflow-hidden max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-separator pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-apple-blue/10 text-apple-blue">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-t1">Search / Manage Booking</h3>
                  <p className="text-xs text-t2">Lookup or remove records directly from Google Sheet</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full p-2 text-t3 hover:bg-surface-2 hover:text-t1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Serial No. (e.g. 2 or BH-002)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="flex-1 rounded-button bg-surface-2 px-4 py-3 text-sm font-medium text-t1 placeholder:text-t3 border border-separator focus:border-apple-blue focus:outline-none transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-button bg-apple-blue px-5 py-3 text-sm font-semibold text-white shadow-md active:scale-95 disabled:opacity-70 transition-all"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>Search</span>}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl bg-danger/10 border border-danger/20 p-4 text-center text-sm font-medium text-danger">
                {error}
              </div>
            )}

            {/* Booking Details Card */}
            {booking && (
              <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
                <div className="rounded-2xl bg-surface-2 p-5 border border-separator/60 flex flex-col gap-3.5">
                  <div className="flex items-center justify-between border-b border-separator/60 pb-3">
                    <span className="text-xl font-extrabold text-apple-blue">{booking.bookingId}</span>
                    <span className="rounded-chip bg-success/15 px-3 py-1 text-xs font-bold text-success">
                      {booking.paymentStatus || 'Confirmed'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-t1">
                      <Tag className="h-4 w-4 text-t3 shrink-0" />
                      <span className="font-semibold">{booking.guestName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-t1 font-mono">
                      <Phone className="h-4 w-4 text-t3 shrink-0" />
                      <span>{booking.phoneNumber || 'N/A'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-t1 col-span-full">
                      <Calendar className="h-4 w-4 text-t3 shrink-0" />
                      <span>{booking.checkinDate} → {booking.checkoutDate} ({booking.numberOfNights} Nights)</span>
                    </div>

                    <div className="flex items-center gap-2 text-t1">
                      <Home className="h-4 w-4 text-t3 shrink-0" />
                      <span>{booking.propertyType}</span>
                    </div>

                    <div className="flex items-center gap-2 text-t1">
                      <DollarSign className="h-4 w-4 text-t3 shrink-0" />
                      <span>Total: ₹{booking.totalAmount}</span>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="mt-1 pt-3 border-t border-separator/60 flex items-start gap-2 text-xs text-t2">
                      <FileText className="h-4 w-4 text-t3 shrink-0 mt-0.5" />
                      <span>Notes: {booking.notes}</span>
                    </div>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-button bg-danger/10 hover:bg-danger text-danger hover:text-white px-5 py-3 text-sm font-semibold border border-danger/30 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Deleting from Sheet...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      <span>Delete this Reservation</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

SearchBookingModal.displayName = 'SearchBookingModal';
