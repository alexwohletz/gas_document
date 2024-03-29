/**
 * Test function for Spreadsheet Form Submit trigger functions.
 * Loops through content of sheet, creating simulated Form Submit Events.
 *
 * Check for updates: https://stackoverflow.com/a/16089067/1677912
 *
 * See https://developers.google.com/apps-script/guides/triggers/events#google_sheets_events
 */
function test_onFormSubmit() {
    var dataRange = SpreadsheetApp.getActiveSheet().getDataRange();
    var data = dataRange.getValues();
    var headers = data[0];
    // Start at row 1, skipping headers in row 0
    for (var row=1; row < data.length; row++) {
      var e = {};
      e.values = data[row].filter(Boolean);  // filter: https://stackoverflow.com/a/19888749
      e.range = dataRange.offset(row,0,1,data[0].length);
      e.namedValues = {};
      // Loop through headers to create namedValues object
      // NOTE: all namedValues are arrays.
      for (var col=0; col<headers.length; col++) {
        e.namedValues[headers[col]] = [data[row][col]];
      }
      // Pass the simulated event to onFormSubmit
      onFormSubmit(e);
    }
  }