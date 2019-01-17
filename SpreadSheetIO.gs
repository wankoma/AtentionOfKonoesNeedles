///*
//* 入力されたシート名にて、当該シートをメモ化します.
//* 
//* @spreadSheetKey 入力したいスプレッドシートのキー値
//* @return メモ化したスプレッドシート
//*/
//function getMainSheet(spreadSheetKey) {
//  //メモが存在していれば既存のメモを渡す
//  if (getMainSheet.memoSheet) { return getMainSheet.memoSheet; }
//
//  getMainSheet.memoSheet = SpreadsheetApp.getActive().getSheetByName(spreadSheetKey);
//  return getMainSheet.memoSheet;
//}
//
//// 最初に呼ばれる関数
//function firstCalledFunc() {
//  var sheet = getMainSheet(); //APIを叩いてシートを取得
//
//  // some code ....
//}
//
//// 次に呼ばれる関数
//function secondCalledFunc() {
//  var sheet = getMainSheet(); //メモ化されたシートを返す
//
//  // some code ....
//}


/*
* 全件検索を行います.
* 
* @return スプレッドシートの全件
*/
function getMainSheet(spreadSheetKey) {  
  var spreadSheet = SpreadsheetApp.getActive().getSheetByName(spreadSheetKey);

  return spreadSheet;
}


/*
* 全件検索を行います.
* 
* @return スプレッドシートの全件
*/
function getAllData() {  
  var data = spreadsheet.getDataRange().getValues();
  
  return data;
}