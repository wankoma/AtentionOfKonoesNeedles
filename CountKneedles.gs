  var amLine = new Date("2019-02-06T07:30:00.872+09:00");
  var pmLine = new Date("2019-02-06T19:30:00.872+09:00");
  var minitOfDay = 1000 * 60 * 60 * 24;

/**
* 現在の注射本数を返却します.
* @return numberOfNeedles 現在の注射本数
*/
function getNowNumberOfNeedles() {
  spreadSheetInit();
  var data = getAllData();
    
  //末端(最新)のレコードを返却
  var havingNeedles = Math.floor(data.slice(-1)[0][4]);
  var purchaseDay = new Date(data.slice(-1)[0][3]);
  var today = new Date(); 
  
  var nowNeedles = culcNowNumberOfNeedles(purchaseDay, today, havingNeedles);
  
  return nowNeedles;
}

/**
* 受け取った購入本数をスプレッドシートに登録します.
* @return numberOfNeedles 現在の注射本数
*/
function insertNeedles(number) {
  /* TODO 引数の注射針本数を数値化する必要がある？ */
  /* 現在保有している注射数から、どのくらい持つのか日数を割り出す*/
  spreadSheetInit();
  var result = false;
  
  /* key, today, limitday, stockNeedles, nowPurchaseNeedles
  var nowKey = sheet.getRange('A:A').getValues().filter(String);
  var key = Math.floor(nowKey.slice(-1) + 1);
  var today = new Date(); 
  var nowPurchaseNeedles = getNowNumberOfNeedles() + number;
  var data = [key, today, number, '2019-02-20T14:39:12.872+09:00', nowPurchaseNeedles];
  
  insertData(data)
  */
  
  return result;
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
function culcNowNumberOfNeedles(purchaseDay, today, havingNumberOfNeedles) {
  var n = purchaseDay.getTime();
  var s = today.getTime();
  var useDays =　((today.getTime() - purchaseDay.getTime()) / minitOfDay);
  
  //１日に2本使用し、当日７時・19時で使用する
  var useNeedles = Math.floor(useDays * 2);
  if(today.getTime() >= amLine.getTime()){
    useNeedles = useNeedles + 1;
    
  } else if (today.getTime() >= pmLine.getTime()){
    useNeedles = useNeedles + 2;
  }
  
  havingNumberOfNeedles = havingNumberOfNeedles - useNeedles;
  
  return havingNumberOfNeedles;
}


/**
* あと何日注射器が持つのか計算します.
*
* @param toay 現在の日付
* @param havingNeedles 所持している注射器本数
* @return 注射器の在庫が無くなる日付
*/
function calcLimitDay(today, havingNumberOfNeedles) {
  
  //現在の日付との差分＝havingNumberOfNeedlesを2で割って切り上げを行う
  //差分を現在の日付に足す
  
}




