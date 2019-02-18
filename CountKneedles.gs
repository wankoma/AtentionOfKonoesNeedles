/**
* 現在の注射本数を返却します.
* @return numberOfNeedles 現在の注射本数
*/
function getNowNumberOfNeedles() {
  spreadSheetInit();
  var data = getAllData();
    
  //末端(最新)のレコードを返却
  var havingNeedles = Math.floor(data.slice(-1)[0][4]);
  var purchaseDay = new Date(data.slice(-1)[0][2]);
  var today = new Date(); 
  
  var nowNeedles = culcNowNumberOfNeedles(purchaseDay, today, havingNeedles);
  
  return nowNeedles;
}

/**
* 受け取った購入本数をスプレッドシートに登録します.
* @return numberOfNeedles 現在の注射本数
*/
function insertNeedles(number) {
  var nowNumberOfNeedles = getNowNumberOfNeedles() + number;
  var today = new Date(); 
  
  return numberOfNeedles;
}

/**
* SpreadSheetを使用するにあったって事前準備メソッド
*/
function spreadSheetInit() {
  SpreadSheetIO(PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_KEY'), PropertiesService.getScriptProperties().getProperty('SHEET_NAME'));
  getMainSheet();
  
}

/**
* 現在の注射器本数を計算します.
*
* @param purchaseDay 購入日
* @param purchaseDay 現在の日付
* @param havingNeedles 所持している注射器本数
* @return 注射器の残数
*/
function culcNowNumberOfNeedles(purchaseDay, today, havingNeedles) {
  var n = purchaseDay.getTime();
  var s = today.getTime();
  var useDays =　((today.getTime() - purchaseDay.getTime()) / (1000 * 60 * 60 * 24));
  var amLine = new Date("2019-02-06T07:30:00.872+09:00");
  var pmLine = new Date("2019-02-06T19:30:00.872+09:00");
  
  //１日に２本使用し、当日７時・19時で使用する
  var useNeedles = Math.floor(useDays * 2);
  if(today.getTime() >= amLine.getTime()){
    useNeedles = useNeedles + 1;
    
  } else if (today.getTime() >= pmLine.getTime()){
    useNeedles = useNeedles + 2;
  }
  
  havingNeedles = havingNeedles - useNeedles;
  
  return havingNeedles;
}