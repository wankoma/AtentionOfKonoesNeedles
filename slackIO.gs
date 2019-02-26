
/*トリガーを設定するクラスです。
* @param triggerDay: トリガーをする日付 
*/
function setTrigger(triggerDay) {
  ScriptApp.newTrigger("main").timeBased().at(triggerDay).create();
}

/*トリガーを削除するクラスです。
* @param triggerDay: トリガーをする日付 
*/
function deleteTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for(var i=0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == "main") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

/*トリガーを削除するクラスです。
* @param triggerDay: トリガーをする日付 
*/
function main(triggerDate) {
  deleteTrigger();
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
//  var slackPostMessage = ["あと5日でなくなるにゃ！",
//                          triggerDate.year + "/" + triggerDate.month + "/" + triggerDate.day-of-month + "/" + triggerDate.hour
//                         ].join('\n');
  var slackPostMessage = "あと5日でなくなるにゃ！";
  var app = SlackApp.create(token);
  var botName = "このえ";
  var botIcon = "";
  var channelId = "CF79C24P2";
  
  return app.postMessage(channelId, slackPostMessage,{
    username: botName,
    icon_url: botIcon
  });
}

function test_main() {
  var today = new Date("2019-02-26T15:33:00.872+09:00"); 
  setTrigger(today);
  
}