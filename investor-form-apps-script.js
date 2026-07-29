// Google Apps Script for Investor Form Data Collection
// This script handles form submissions and saves data to Google Sheets

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (you'll need to create one and get its ID)
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Prepare the data to be inserted
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.fullName || '',
      data.whatsappNumber || '',
      data.investmentReasons || ''
    ];
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      const headers = ['التاريخ والوقت', 'الإسم و اللقب', 'رقم الواتساب', 'أسباب الاهتمام بالاستثمار'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#fbbc05');
      headerRange.setFontColor('#000000');
    }
    
    // Insert the new row
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 4);
    
    // Log success for debugging
    console.log('Data saved successfully:', data);
    
    // Return success response with proper headers
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'تم حفظ البيانات بنجاح',
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error saving data:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'حدث خطأ أثناء حفظ البيانات'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Investor Form Data Collection API is running',
      timestamp: new Date()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Function to set up the sheet with proper formatting
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // Clear existing data
  sheet.clear();
  
  // Set headers
  const headers = ['التاريخ والوقت', 'الإسم و اللقب', 'رقم الواتساب', 'أسباب الاهتمام بالاستثمار'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#fbbc05');
  headerRange.setFontColor('#000000');
  headerRange.setHorizontalAlignment('center');
  
  // Set column widths
  sheet.setColumnWidth(1, 150); // Date column
  sheet.setColumnWidth(2, 200); // Name column
  sheet.setColumnWidth(3, 150); // WhatsApp column
  sheet.setColumnWidth(4, 300); // Reasons column
  
  // Freeze the header row
  sheet.setFrozenRows(1);
  
  console.log('Sheet setup completed successfully');
}

// Function to test the script
function testScript() {
  const testData = {
    fullName: 'أحمد محمد',
    whatsappNumber: '',
    investmentReasons: 'أهتم بالاستثمار في webscale بسبب النمو الكبير في مجال الذكاء الاصطناعي والتجارة الإلكترونية'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}
