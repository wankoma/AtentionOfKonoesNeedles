  var amLine = new Date("2019-02-06T07:00:00.872+09:00");
  var pmLine = new Date("2019-02-06T19:00:00.872+09:00");
  var minitOfDay = 1000 * 60 * 60 * 24;

/**
* SpreadSheetを使用するにあったって事前準備メソッド
*/
function spreadSheetInit() {
  SpreadSheetIO(PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_KEY'), PropertiesService.getScriptProperties().getProperty('SHEET_NAME'));
  getMainSheet();
  
}

/**
* 現在の注射本数を返却します.
* @return numberOfNeedles 現在の注射本数
*/
function getNowNumberOfNeedles() {
  spreadSheetInit();
  var data = getAllData();
    
  //末端(最新)のレコードを返却
  var havingNeedles = Math.floor(data.slice(-1)[0][4]);
  var purchaseDay = new Date(data.slice(-1)[0][1]);
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
  var useNeedles = (Math.floor(useDays) * 2);
  useNeedles = (useNeedles + calcUsingNeedleToday(today));
 
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
  
  var limitDay = new Date(today.getTime());

  var usePeriod = today.getTime() + ((havingNumberOfNeedles / 2) * minitOfDay);
  limitDay.setTime(usePeriod)
  
  //午前午後による注射器本数計算によって、午前午後を判定する.
  if (calcUsingNeedleToday(limitDay) > 1) {
    limitDay.setHours(pmLine.getHours());
    limitDay.setMinutes(1); 
    return limitDay;
    
  } else {
    limitDay.setHours(amLine.getHours());
    limitDay.setMinutes(1);  
    return limitDay;
  }
 
}

/**
* 当日注射を何本使用しているのか、時刻から計算します.
* 現在、7時・19時で使用.
* @param today: 本日の日付
* @retrun :本日の使用本数
*/
function calcUsingNeedleToday(today) {
  
   if (today.getTime() >= amLine.getTime()) {
    return 1;
    
  } else if (today.getTime() >= pmLine.getTime()) {
    return 2;
    
  } else {
    return 0;
    
  }
  
}

function limitDay_test() {
  var buyingNeedles = 0;
  var today = new Date("2020-02-28T07:00:00.872+09:00"); 
  var havingNumberOfNeedles = getNowNumberOfNeedles() + buyingNeedles;
  
  var limitDay = calcLimitDay(today, havingNumberOfNeedles);
  
}




