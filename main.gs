//--------slackからメッセージ受け取ります-------//
function doGet() { 
  var slackPostMessage = "注射　本";
  
  var e = { "parameter" : {
    "channel_name":"sandbox",
    "user_id":"U96LWBQ5T",
       "user_name":"wankoma.k",
       "trigger_word":"注射",
       "service_id":"517948553011",
       "team_domain":"koha-koma-koru",
       "team_id":"T96EFAAM9",
       "text":slackPostMessage,
       "channel_id":"CF79C24P2",
       "token":"GcqfK3g55MQHI9rV72OAIKuM",
       "timestamp":"1549338872.000300"},
           "contextPath":"",
           "contentLength":281,
           "queryString":""
          };
 
  if(e.parameter.user_name != "slackbot"){
     doPost(e); 
  }
}

/*
* 入力されたメッセージで分岐し、発信メッセージを作成
*
* @return message 発信メッセージ
*/
function menuChange(e) {
  var halfBlank = " ";
  var blank = "　";
  var message = "メッセージが認識できませんでした。";
  var matchNumberOfNeedles = /^\d*本/;
  var matchQuestionNumberOfNeedles = '何本';
  var messageFromSlack = e.parameter.text.replace(blank, halfBlank).split(halfBlank);
  
  spreadSheetInit();
  
  if(messageFromSlack[1].indexOf(matchQuestionNumberOfNeedles) != -1) {
     message = getNowNumberOfNeedles() + "本です。";
     
 } else if(messageFromSlack[1].match(matchNumberOfNeedles) != -1) {
     message = "登録しました！";
  
 }
  return message;
}

//--------実際にpostします-------//
function doPost(e) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var bot_name = "";
  var bot_icon = "";
  var message = "てすと";
  var encodingOptionCode = "camel";
  var app = SlackApp.create(token);
  
  message = menuChange(e);
    
  
  return app.postMessage(e.parameter.channel_id, message,{
    username: bot_name,
    icon_url: bot_icon
  });
  
}



