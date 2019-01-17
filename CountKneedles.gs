function getNowNumberOfNeedles() {
  
  var sheetKey = PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_KEY');
  var sheetMemo = SpreadSheetIO.getMainSheet(sheetKey);
  
  
  return "5本"
}
