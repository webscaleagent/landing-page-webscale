// Google Apps Script for Sponsorship Registration Form Data Collection
// This script handles form submissions from UnifiedRegistrationForm and saves data to Google Sheets

function doPost(e) {
  try {
    // Parse the incoming FormData
    const formData = e.parameter;
    
    // Get the active spreadsheet (you'll need to create one and get its ID)
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Prepare the data to be inserted
    const timestamp = new Date();
    const rowData = [
      timestamp,
      formData.companyName || '',
      formData.sector || '',
      formData.otherSector || '',
      formData.companySize || '',
      formData.wilaya || '',
      formData.fullName || '',
      formData.role || '',
      formData.email || '',
      formData.phone || '',
      formData.sponsorshipType || '',
      formData.otherSponsorType || '',
      formData.sponsorshipGoals || '',
      formData.otherGoal || '',
      formData.budget || '',
      formData.notes || '',
      formData.consent === 'true' ? 'نعم' : 'لا'
    ];
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      const headers = [
        'التاريخ والوقت',
        'اسم الشركة / المؤسسة',
        'المجال أو القطاع',
        'قطاع آخر',
        'حجم الشركة',
        'الولاية',
        'الاسم الكامل',
        'المنصب / الدور',
        'البريد الإلكتروني',
        'رقم الهاتف',
        'نوع الرعاية',
        'نوع رعاية آخر',
        'أهداف الرعاية',
        'هدف آخر',
        'ميزانية الرعاية',
        'ملاحظات إضافية',
        'موافقة الحضور'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#fbbc05');
      headerRange.setFontColor('#000000');
      headerRange.setHorizontalAlignment('center');
      headerRange.setVerticalAlignment('middle');
      headerRange.setWrap(true);
    }
    
    // Insert the new row
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, rowData.length);
    
    // Format the new row
    const lastRow = sheet.getLastRow();
    const dataRange = sheet.getRange(lastRow, 1, 1, rowData.length);
    dataRange.setVerticalAlignment('top');
    dataRange.setWrap(true);
    
    // Alternate row colors for better readability
    if (lastRow % 2 === 0) {
      dataRange.setBackground('#f8f9fa');
    }
    
    // Log success for debugging
    console.log('Sponsorship data saved successfully:', formData);
    
    // Return success response with proper CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'تم حفظ بيانات الرعاية بنجاح',
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error saving sponsorship data:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'حدث خطأ أثناء حفظ بيانات الرعاية'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Sponsorship Registration Form API is running',
      timestamp: new Date(),
      status: 'active'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Function to set up the sheet with proper formatting
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // Clear existing data
  sheet.clear();
  
  // Set headers
  const headers = [
    'التاريخ والوقت',
    'اسم الشركة / المؤسسة',
    'المجال أو القطاع',
    'قطاع آخر',
    'حجم الشركة',
    'الولاية',
    'الاسم الكامل',
    'المنصب / الدور',
    'البريد الإلكتروني',
    'رقم الهاتف',
    'نوع الرعاية',
    'نوع رعاية آخر',
    'أهداف الرعاية',
    'هدف آخر',
    'ميزانية الرعاية',
    'ملاحظات إضافية',
    'موافقة الحضور'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#fbbc05');
  headerRange.setFontColor('#000000');
  headerRange.setHorizontalAlignment('center');
  headerRange.setVerticalAlignment('middle');
  headerRange.setWrap(true);
  headerRange.setFontSize(11);
  
  // Set optimal column widths
  const columnWidths = [
    150, // التاريخ والوقت
    200, // اسم الشركة
    150, // المجال
    120, // قطاع آخر
    130, // حجم الشركة
    100, // الولاية
    150, // الاسم الكامل
    120, // المنصب
    200, // البريد الإلكتروني
    120, // رقم الهاتف
    200, // نوع الرعاية
    120, // نوع رعاية آخر
    250, // أهداف الرعاية
    120, // هدف آخر
    130, // ميزانية الرعاية
    300, // ملاحظات إضافية
    100  // موافقة الحضور
  ];
  
  columnWidths.forEach((width, index) => {
    sheet.setColumnWidth(index + 1, width);
  });
  
  // Freeze the header row
  sheet.setFrozenRows(1);
  
  // Set sheet direction to RTL for Arabic support
  sheet.setRightToLeft(true);
  
  console.log('Sponsorship registration sheet setup completed successfully');
}

// Function to create data validation for specific columns
function addDataValidation() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // Add data validation for email column (column 9)
  const emailColumn = sheet.getRange('I:I');
  const emailRule = SpreadsheetApp.newDataValidation()
    .requireFormulaSatisfied('=ISEMAIL(I2)')
    .setAllowInvalid(false)
    .setHelpText('يرجى إدخال بريد إلكتروني صحيح')
    .build();
  emailColumn.setDataValidation(emailRule);
  
  console.log('Data validation added successfully');
}

// Function to test the script with sample data
function testScript() {
  const testData = {
    companyName: 'شركة التكنولوجيا المتقدمة',
    sector: 'تكنولوجيا',
    otherSector: '',
    companySize: '10–50 موظف',
    wilaya: 'الجزائر',
    fullName: 'أحمد محمد علي',
    role: 'مدير التسويق',
    email: 'ahmed@example.com',
    phone: '',
    sponsorshipType: 'راعٍ ذهبي, راعٍ فضي',
    otherSponsorType: '',
    sponsorshipGoals: 'زيادة الوعي بالعلامة التجارية, توليد عملاء محتملين',
    otherGoal: '',
    budget: '200,000 – 500,000 دج',
    notes: 'نحن مهتمون بالمشاركة كراع ذهبي للفعالية',
    consent: 'true'
  };
  
  const mockEvent = {
    parameter: testData
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}

// Function to get sheet statistics
function getSheetStats() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  
  const stats = {
    totalSubmissions: lastRow > 1 ? lastRow - 1 : 0,
    totalColumns: lastColumn,
    lastUpdated: new Date(),
    sheetName: sheet.getName()
  };
  
  console.log('Sheet Statistics:', stats);
  return stats;
}

// Function to export data as CSV (for backup purposes)
function exportToCsv() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  let csvContent = '';
  data.forEach(row => {
    csvContent += row.join(',') + '\n';
  });
  
  // Create a blob and save to Drive (optional)
  
  console.log('CSV export completed');
  return csvContent;
}

