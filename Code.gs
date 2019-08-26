//Load the lodash library for GS
var _ = LodashGS.load();


function onSubmit(e) {

  // Get the active sheet
  var data = e.range.getSheet().getDataRange().getValues();
  // Assign the data to the appropriate arrays
  var header = data[0];
  var currentRow = data[1]
  // Get the document number
  var docNum = data[1][1]
  // Build the document in google drive
  buildDocument(docNum,header,currentRow);
  Logger.log(data);
  Logger.log(headers);
}


/**
 * A simple function to push a recently filled form into a google document template.
 * @param {String} docNumber 
 * @param {Array[][]} header 
 * @param {Array[]} row 
 */
function buildDocument(docNumber,header,row) {

  var file = DriveApp.getFileById('1hiXRMSEgaVJi7NGffnDCmBP53z6Hep3O9n8YzGw9bXo');
  var copy = file.makeCopy('Test document: ' + docNumber);
  var copyID = copy.getId();
  var doc = DocumentApp.openById(copyID).getBody();
  doc.replaceText('%document%', docNumber.toString());
  var zipped = _.zip(header,row);
  var full = [];
  for each (var arr in zipped) {
    full.push(_.chunk(arr,1));
  }

  var table = full;
  //Add the completed table to the word document.
  doc.appendTable(table);

  Logger.log(headers);

}
