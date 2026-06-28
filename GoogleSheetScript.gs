/**
 * Google Apps Script for Beyond Heaven Resort Booking Manager
 * Supports: Appending Bookings (POST), Searching Bookings (GET), Deleting Bookings (GET/POST)
 */

function doPost(e) {
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Bookings') || ss.getActiveSheet();
    
    // Handle Delete Action via POST
    if (data.action === 'delete') {
      var searchId = String(data.bookingId || data.id || '').trim().toUpperCase();
      var rows = sheet.getDataRange().getValues();
      for (var i = 1; i < rows.length; i++) {
        var rowId = String(rows[i][0]).trim().toUpperCase();
        if (rowId === searchId || rowId === 'BH-' + searchId || 'BH-' + rowId === searchId) {
          sheet.deleteRow(i + 1);
          return createJsonResponse({ status: 'success', message: 'Booking deleted successfully' });
        }
      }
      return createJsonResponse({ status: 'error', message: 'Booking ID not found' });
    }
    
    // Default: Append New Booking
    var newRow = [
      data.bookingId || '',                   // Col A: Booking ID
      data.guestName || '',                   // Col B: Guest Name
      "'" + String(data.phoneNumber || ''),   // Col C: Phone Number
      formatDateDDMMYYYY(data.checkinDate),   // Col D: Check-in Date
      formatDateDDMMYYYY(data.checkoutDate),  // Col E: Check-out Date
      Number(data.numberOfNights || 0),       // Col F: Nights
      data.propertyType || '',                // Col G: Property Type
      Number(data.totalAmount || 0),          // Col H: Total Amount
      Number(data.advancePaid || 0),          // Col I: Advance Paid
      Number(data.balanceAmount || 0),        // Col J: Balance Amount
      data.paymentStatus || '',               // Col K: Payment Status
      data.bookingSource || '',               // Col L: Booking Source
      data.notes || ''                        // Col M: Notes
    ];
    
    sheet.appendRow(newRow);
    var lastRow = sheet.getLastRow();
    
    // Alignment & Formatting
    sheet.getRange(lastRow, 1).setFontWeight('bold').setHorizontalAlignment('left');
    sheet.getRange(lastRow, 2).setHorizontalAlignment('left');
    sheet.getRange(lastRow, 3).setHorizontalAlignment('right');
    sheet.getRange(lastRow, 4, 1, 2).setHorizontalAlignment('center');
    sheet.getRange(lastRow, 6).setHorizontalAlignment('right');
    sheet.getRange(lastRow, 7).setHorizontalAlignment('left');
    
    var amountRange = sheet.getRange(lastRow, 8, 1, 3);
    amountRange.setHorizontalAlignment('right');
    amountRange.setNumberFormat('0');
    
    sheet.getRange(lastRow, 11, 1, 3).setHorizontalAlignment('left');
    
    return createJsonResponse({ status: 'success', message: 'Booking saved successfully' });
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

/**
 * Handles GET requests for Searching and Deleting Bookings
 * e.g. ?action=search&id=BH-001 or ?action=delete&id=BH-001
 */
function doGet(e) {
  try {
    var action = (e.parameter.action || '').toLowerCase();
    var id = e.parameter.id || e.parameter.bookingId;
    
    if (!id) {
      return createJsonResponse({ status: 'error', message: 'Please enter a Booking ID or Serial Number' });
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Bookings') || ss.getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    var searchId = String(id).trim().toUpperCase();
    if (!searchId.startsWith('BH-') && !isNaN(Number(searchId))) {
      searchId = 'BH-' + String(Number(searchId)).padStart(3, '0');
    }
    
    for (var i = 1; i < data.length; i++) {
      var rowId = String(data[i][0]).trim().toUpperCase();
      if (rowId === searchId || rowId === id.toUpperCase() || 'BH-' + rowId === searchId) {
        
        if (action === 'delete') {
          sheet.deleteRow(i + 1);
          return createJsonResponse({ status: 'success', message: 'Reservation ' + rowId + ' has been permanently deleted.' });
        }
        
        // Search return
        var bookingDetails = {
          bookingId: data[i][0],
          guestName: data[i][1],
          phoneNumber: String(data[i][2]).replace(/^'/, ''),
          checkinDate: data[i][3],
          checkoutDate: data[i][4],
          numberOfNights: data[i][5],
          propertyType: data[i][6],
          totalAmount: data[i][7],
          advancePaid: data[i][8],
          balanceAmount: data[i][9],
          paymentStatus: data[i][10],
          bookingSource: data[i][11],
          notes: data[i][12],
          rowIndex: i + 1
        };
        return createJsonResponse({ status: 'success', data: bookingDetails });
      }
    }
    
    return createJsonResponse({ status: 'error', message: 'No reservation found matching ID "' + id + '".' });
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

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
