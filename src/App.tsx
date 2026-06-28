import React, { Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { useBookingStore } from './store/bookingStore';
import { AppHeader } from './components/layout/AppHeader';
import { AppFooter } from './components/layout/AppFooter';
import { OfflineBanner } from './components/ui/OfflineBanner';
import { Modal } from './components/ui/Modal';
import { SearchBookingModal } from './components/ui/SearchBookingModal';
import { KeyboardShortcutsCard } from './components/ui/KeyboardShortcutsCard';
import { Loader2, Sparkles } from 'lucide-react';

// Code split by route (React.lazy + Suspense)
const LazyBookingForm = React.lazy(() =>
  import('./components/form/BookingForm').then((m) => ({ default: m.BookingForm }))
);

const pageVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.28, 0.11, 0.32, 1] },
  },
};

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isOnline = useNetworkStatus();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {
    showSuccessModal,
    showErrorModal,
    lastBookingId,
    lastGuestName,
    errorMessage,
    closeSuccessModal,
    closeErrorModal,
  } = useBookingStore();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-bg text-t1 font-sans antialiased transition-colors duration-200">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--color-surface)',
              color: 'var(--color-t1)',
              border: '1px solid var(--color-separator)',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 500,
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
            },
            success: {
              iconTheme: {
                primary: '#34c759',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff3b30',
                secondary: '#ffffff',
              },
            },
          }}
        />

        <OfflineBanner isOnline={isOnline} />
        <AppHeader theme={theme} onToggleTheme={toggleTheme} onOpenSearch={() => setIsSearchOpen(true)} />

        <main className="flex-1 w-full mx-auto max-w-[700px] px-4 sm:px-6 py-8 sm:py-12">
          {/* Page Hero Header */}
          <motion.div
            variants={pageVariant}
            initial="hidden"
            animate="visible"
            className="mb-8 text-center sm:text-left"
          >
            <div className="inline-flex items-center gap-1.5 rounded-chip bg-apple-blue/10 px-3 py-1 text-xs font-semibold text-apple-blue mb-3 border border-apple-blue/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Luxury Concierge System</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-t1 mb-2">
              New Resort Reservation
            </h1>
            <p className="text-sm sm:text-base text-t2">
              Enter guest accommodation preferences and sync directly with live Google Sheets records.
            </p>
          </motion.div>

          {/* Router & Lazy Loaded Booking Form */}
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-t2">
                <Loader2 className="h-8 w-8 animate-spin text-apple-blue" />
                <span className="text-sm font-medium">Loading Booking Portal...</span>
              </div>
            }
          >
            <Routes>
              <Route path="/*" element={<LazyBookingForm onToggleTheme={toggleTheme} />} />
            </Routes>
          </Suspense>

          <KeyboardShortcutsCard />
        </main>

        <AppFooter />

        {/* Modals */}
        <Modal
          isOpen={showSuccessModal}
          onClose={closeSuccessModal}
          type="success"
          title="Booking Confirmed!"
          bookingId={lastBookingId}
          guestName={lastGuestName}
          onNewBooking={closeSuccessModal}
        />

        <Modal
          isOpen={showErrorModal}
          onClose={closeErrorModal}
          type="error"
          title="Submission Failed"
          message={errorMessage}
        />

        <SearchBookingModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    </BrowserRouter>
  );
};

export default App;
