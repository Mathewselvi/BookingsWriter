/**
 * Google Apps Script for Beyond Heaven Resort Booking Manager
 * Configured specifically to match your exact table format & alignment (13 Columns)
 */

function doPost(e) {
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Bookings') || ss.getActiveSheet();
    
    // Prepare row data exactly matching your 13 fields
    var newRow = [
      data.bookingId || '',                   // Col A: Booking ID (e.g. BH-001)
      data.guestName || '',                   // Col B: Guest Name
      "'" + String(data.phoneNumber || ''),   // Col C: Phone Number (prefix ' preserves phone number format)
      formatDateDDMMYYYY(data.checkinDate),   // Col D: Check-in Date (DD/MM/YYYY)
      formatDateDDMMYYYY(data.checkoutDate),  // Col E: Check-out Date (DD/MM/YYYY)
      Number(data.numberOfNights || 0),       // Col F: Nights
      data.propertyType || '',                // Col G: Property Type (e.g. 2 Huts, Villa)
      Number(data.totalAmount || 0),          // Col H: Total Amount (e.g. 14000)
      Number(data.advancePaid || 0),          // Col I: Advance Paid (e.g. 7000)
      Number(data.balanceAmount || 0),        // Col J: Balance Amount (e.g. 7000)
      data.paymentStatus || '',               // Col K: Payment Status (e.g. Full Paid)
      data.bookingSource || '',               // Col L: Booking Source (e.g. B2B, Walk IN)
      data.notes || ''                        // Col M: Notes (e.g. 4000 commission)
    ];
    
    // Append the new row
    sheet.appendRow(newRow);
    
    var lastRow = sheet.getLastRow();
    
    // --- EXACT ALIGNMENT & STYLING MATCHING YOUR TABLE ---
    
    // 1. Booking ID (Col A): Bold & Left aligned
    var idCell = sheet.getRange(lastRow, 1);
    idCell.setFontWeight('bold');
    idCell.setHorizontalAlignment('left');
    
    // 2. Guest Name (Col B): Left aligned
    sheet.getRange(lastRow, 2).setHorizontalAlignment('left');
    
    // 3. Phone Number (Col C): Right aligned
    sheet.getRange(lastRow, 3).setHorizontalAlignment('right');
    
    // 4 & 5. Check-in & Check-out Dates (Col D & E): Center aligned
    sheet.getRange(lastRow, 4, 1, 2).setHorizontalAlignment('center');
    
    // 6. Nights (Col F): Right aligned
    sheet.getRange(lastRow, 6).setHorizontalAlignment('right');
    
    // 7. Property Type (Col G): Left aligned
    sheet.getRange(lastRow, 7).setHorizontalAlignment('left');
    
    // 8, 9, 10. Amounts (Col H, I, J): Right aligned plain integer formatting (e.g. 14000)
    var amountRange = sheet.getRange(lastRow, 8, 1, 3);
    amountRange.setHorizontalAlignment('right');
    amountRange.setNumberFormat('0');
    
    // 11, 12, 13. Status, Source, Notes (Col K, L, M): Left aligned
    sheet.getRange(lastRow, 11, 1, 3).setHorizontalAlignment('left');
    
    return createJsonResponse({ status: 'success', message: 'Booking appended matching your layout' });
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

/**
 * Converts "2026-06-01" (ISO YYYY-MM-DD) to "01/06/2026" (DD/MM/YYYY)
 */
function formatDateDDMMYYYY(isoDate) {
  if (!isoDate) return '';
  var parts = String(isoDate).split('-');
  if (parts.length === 3) {
    return parts[2] + '/' + parts[1] + '/' + parts[0];
  }
  return isoDate;
}

function doOptions(e) {
  return createJsonResponse({ status: 'success' });
}

function createJsonResponse(responseObject) {
  var output = ContentService.createTextOutput(JSON.stringify(responseObject));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
