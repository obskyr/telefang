function previewSelectedCell() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var sheetName = sheet.getName();
  if (!SHEET_PARAMS.hasOwnProperty(sheetName)) {throw "Only the SMS and Field Guide sheets are supported at the moment.";}
  var params = SHEET_PARAMS[sheetName];
  
  var cell = sheet.getActiveCell();
  var text = cell.getValue();
  
  if (params.prelude && text.slice(0, params.prelude.length) === params.prelude) {
    text = text.slice(params.prelude.length);
  }
  if (params.envoi && text.slice(text.length - params.envoi.length) === params.envoi) {
    text = text.slice(0, text.length - params.envoi.length);
  }
  
  if (cell.getColumn() == 4) { // Draft column (in the currently supported sheets, at least).
    text = wrap(text, params.width);
  }
  
  var image = fetchImagePreview(text, params.width, params.line_spacing, params.lines_per_page);
  sheet.insertImage(image, cell.getColumn(), cell.getRow(), sheet.getColumnWidth(cell.getColumn()) + 1, 0);
}