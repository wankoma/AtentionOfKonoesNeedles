
/*トリガーを設定するクラスです.
 * @param triggerDay: トリガーをする日付 
 */
function setTrigger(triggerDay) {
  ScriptApp.newTrigger("main").timeBased().at(triggerDay).create();
}

/*トリガーを削除するクラスです.
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

/*トリガーを実際に実行するクラスです.
 * @param triggerDay: トリガーをする日付 
 */
function main() {
  deleteTrigger();
//  var slackPostMessage = ["あと5日でなくなるにゃ！",
//                          triggerDate.year + "/" + triggerDate.month + "/" + triggerDate.day-of-month + "/" + triggerDate.hour
//                         ].join('\n');
  var slackPostMessage = "あと5日でなくなるにゃ！";
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
  var botIcon = "";
  var app = SlackApp.create(token);
    
  return app.postMessage(e.parameter.channel_id, e.parameter.slackPostMessage,{
    username: botName,
    icon_url: botIcon
  });
  
}

function test_main() {
  var today = new Date("2019-02-26T16:37:00.872+09:00"); 
  setTrigger(today);
  
}


function test_doPost() {
  var e = { "parameter" : {
    "channel_name":"sandbox",
    "user_id":"U96LWBQ5T",
       "user_name":"wankoma.k",
       "trigger_word":"注射",
       "service_id":"517948553011",
       "team_domain":"koha-koma-koru",
       "team_id":"T96EFAAM9",
       "text":"注射　あと何本",
       "channel_id":"CF79C24P2",
       "token":"GcqfK3g55MQHI9rV72OAIKuM",
       "timestamp":"1549338872.000300"},
           "contextPath":"",
           "contentLength":281,
           "queryString":""
          };
  doPost(e);
}