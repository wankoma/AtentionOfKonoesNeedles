/* ebisawa:
function CountKneedles() {}
CountKneedles.getNowNumberOfNeedles = function() {
// ロジック
};
CountKneedles.insertNeedles = function(number) {
// ロジック
};
みたいな書き方をすると、他ファイルから呼び出すときにどのファイルのどの関数なのか分かりやすくなるのでおぬぬめ
*/
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
  var nowNeedles = calcNowNumberOfNeedles(purchaseDay, today, havingNeedles);
  
  return nowNeedles;
}

/**
* 受け取った購入本数をスプレッドシートに登録します.
* @return numberOfNeedles 現在の注射本数
*/
function insertNeedles(number) {
  try {
    spreadSheetInit();
    var nowKey = sheet.getRange('A:A').getValues().filter(String);
    var key = Math.floor(nowKey.slice(-1)) + 1;
    var today = new Date(); 
    var havingNumberOfNeedlesByNow = getNowNumberOfNeedles() + number;
    var limitDay = calcLimitDay(today, havingNumberOfNeedlesByNow);
    var data = [key, today, number, limitDay, havingNumberOfNeedlesByNow];
    
    //注射器期日の5日前にリマインダをセットします.
    setTrigger(limitDay.setTime(limitDay.getTime() -(5 * minitOfDay)));
    return number + "本でとうろくしましたにゃー！" + "\nぜんぶで　" + havingNumberOfNeedlesByNow + "本になったにゃ！\n" + limitDay.toString() + "が終了日にゃ～" ;
    
  } catch(e) {
    return "え、エラーが発生しましたにゃ！\n" + e + "\nすぐにえんじにゃーさんに報告にゃ！";
  }
}

/**
* 現在の注射器本数を計算します.
*
* @param purchaseDay 購入日
* @param purchaseDay 現在の日付
* @param havingNeedles 所持している注射器本数
* @return 注射器の残数
*/
function calcNowNumberOfNeedles(purchaseDay, today, havingNumberOfNeedles) {
  var useDays =　((today.getTime() - purchaseDay.getTime()) / minitOfDay);
  var apPurchaseDay = calcUsingNeedleByToday(purchaseDay);
  var apTodayDay = calcUsingNeedleByToday(today);
  var useNeedles = 0;
  
  //半日も経過しておらず、午前午後が同一ならば計算しない.
  if (!(useDays < 0.5 || apTodayDay == apPurchaseDay)){    
    return havingNumberOfNeedles - (apTodayDay - apPurchaseDay);
    
  } else if (useDays >= 0.5) {  
    //１日に2本使用し、当日７時・19時で使用する
    useNeedles = (Math.floor(useDays) * 2);
    if(apTodayDay != apPurchaseDay) useNeedles + apTodayDay;     
    return havingNumberOfNeedles - useNeedles;   
  }
  
  return havingNumberOfNeedles;
}


/**
* あと何日注射器が持つのか計算します.
*
* @param toay 現在の日付
* @param havingNeedles 所持している注射器本数
* @return 注射器の在庫が無くなる日付
*/
function calcLimitDay(today, havingNumberOfNeedlesByNow) {
  var limitDay = new Date(today.getTime());
  var usePeriod = today.getTime() + ((havingNumberOfNeedlesByNow / 2) * minitOfDay);
  limitDay.setTime(usePeriod)
  
  return limitDay;
}

/**
* 当日注射を何本使用しているのか、時刻から計算します.
* 現在、7時・19時で使用.
* @param today: 本日の日付
* @retrun :本日の使用本数
*/
function calcUsingNeedleByToday(calcDay) {  
  var apCalcDay = calcDay.getHours();
  var amHour = amLine.getHours();
  var pmHour = pmLine.getHours();
  
  if (calcDay.getHours() >= pmLine.getHours()) return 2;
  if (calcDay.getHours() >= amLine.getHours()) return 1;
  return 0;
}




