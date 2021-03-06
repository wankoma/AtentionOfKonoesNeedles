/*トリガーを設定するクラスです.
* @param triggerDay: トリガーをする日付 
*/
function setTrigger(triggerDay) {
  deleteTrigger();
  ScriptApp.newTrigger("executeTrigger").timeBased().at(triggerDay).create();
}

/*トリガーを削除するクラスです.
* @param triggerDay: トリガーをする日付 
*/
function deleteTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for(var i=0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == "executeTrigger") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

/*トリガーを実際に実行するクラスです.
* @param triggerDay: トリガーをする日付 
*/
function executeTrigger() {
  deleteTrigger();
  
  spreadSheetInit();
  var data = getAllData();
  var today = new Date();
  var purchaseDay = new Date(data.slice(-1)[0][3]);
  var useDays = ((purchaseDay.getTime() - today.getTime()) / minitOfDay).toFixed(2);
  
  var slackPostMessage = "大変にゃ！注射器があと" +  useDays + "日でなくなるにゃ！";
  var e = { "parameter" : {
    "text":slackPostMessage,
    "channel_id":"CF79C24P2"
  }
          };
  doPostMessage(e);
}

/* 実際にSlackにpostするクラスです.
* @param slackPostMessage: postするメッセージ内容 
*/
function doPostMessage(e) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var botName = "このえ";
  var iconUrl = "https://drive.google.com/uc?id=1c4HcQLmAEQZOhD7-S9KahRuYDShnIyCK";
  var app = SlackApp.create(token);
  
  return app.postMessage(e.parameter.channel_id, e.parameter.text,{
    as_user:  false,
    username: botName,
    icon_url: iconUrl
  });
  
}
