function myFunction() {
  var data = SpreadsheetApp.getActiveSpreadsheet().getDataRange().getValues();
  var obj = Object.create(data);
  Logger.log(obj.keys);
  
  var file = DriveApp.getFileById('1hiXRMSEgaVJi7NGffnDCmBP53z6Hep3O9n8YzGw9bXo');
  var copy = file.makeCopy('Test document 2');
  var copyID = copy.getId();
  var headers = data[0];
  var doc = DocumentApp.openById(copyID).getBody();
  doc.replaceText('%document%', data[1][0].toString());
  
  var table = [
  ['Question','Is this correct?'],
  ['Something', 'Yes'],
  ['Something', 'No']
  
  ];
  
  doc.appendTable(table);
  
  
  

  Logger.log(headers);
  
}
