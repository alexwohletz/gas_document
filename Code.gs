var _ = LodashGS.load();
var data = SpreadsheetApp.getActiveSpreadsheet().getDataRange().getValues();
var headers = data[0];
var obj = Object.create(data);
var zipped = _.zip(headers,data[1]);
Logger.log(obj.keys);

//import _ from 'lodash'

function testLog(){
  var full = [];
  for each (var arr in zipped) {
    full.push(_.chunk(arr,1));
  }
  Logger.log(full)
}

function onSubmit(e) {
  var values = e.values;
  var dict = e.namedValues;
  var dict = _.entries(dict);
  Logger.log(values);
  Logger.log(dict);
  var flat = _.flatMap(dict);
  Logger.log(flat);


}

function myFunction() {
  Logger.log(obj.keys);
  var file = DriveApp.getFileById('1hiXRMSEgaVJi7NGffnDCmBP53z6Hep3O9n8YzGw9bXo');
  var copy = file.makeCopy('Test document 2');
  var copyID = copy.getId();

  var doc = DocumentApp.openById(copyID).getBody();
  doc.replaceText('%document%', data[1][0].toString());
  
  var full = [];
  
  for each (var arr in zipped) {
    full.push(_.chunk(arr,1));
  }

  var table = full;

  doc.appendTable(table);

  Logger.log(headers);

}
