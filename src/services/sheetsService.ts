import { BookingPayload, SheetsApiResponse } from '../types/booking';
import { SCRIPT_URL } from '../config';

export async function saveBookingToSheet(
  payload: BookingPayload
): Promise<SheetsApiResponse> {
  try {
    if (!SCRIPT_URL || SCRIPT_URL.includes('YOUR_URL')) {
      console.warn('VITE_SCRIPT_URL is not set or using placeholder. Simulating sheet submission.');
      // Simulate network delay for realistic feel
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { status: 'success' };
    }

    await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    });

    // no-cors returns opaque response — treat as success if no throw
    return { status: 'success' };
  } catch (error) {
    console.error('Failed to save booking to Google Sheet:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Network request failed',
    };
  }
}
