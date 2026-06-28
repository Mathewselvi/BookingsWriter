import { BookingPayload, SheetsApiResponse } from '../types/booking';
import { SCRIPT_URL } from '../config';

export async function saveBookingToSheet(
  payload: BookingPayload
): Promise<SheetsApiResponse> {
  try {
    if (!SCRIPT_URL || SCRIPT_URL.includes('YOUR_URL')) {
      console.warn('VITE_SCRIPT_URL is not set or using placeholder. Simulating sheet submission.');
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

    return { status: 'success' };
  } catch (error) {
    console.error('Failed to save booking to Google Sheet:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Network request failed',
    };
  }
}

export async function searchBookingInSheet(bookingId: string): Promise<{ status: 'success' | 'error'; data?: any; message?: string }> {
  try {
    if (!SCRIPT_URL || SCRIPT_URL.includes('YOUR_URL')) {
      return { status: 'error', message: 'Script URL is not configured.' };
    }

    const url = `${SCRIPT_URL}?action=search&id=${encodeURIComponent(bookingId)}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Search failed:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Search failed due to network error.',
    };
  }
}

export async function deleteBookingInSheet(bookingId: string): Promise<{ status: 'success' | 'error'; message?: string }> {
  try {
    if (!SCRIPT_URL || SCRIPT_URL.includes('YOUR_URL')) {
      return { status: 'error', message: 'Script URL is not configured.' };
    }

    const url = `${SCRIPT_URL}?action=delete&id=${encodeURIComponent(bookingId)}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Delete failed:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Delete failed due to network error.',
    };
  }
}
