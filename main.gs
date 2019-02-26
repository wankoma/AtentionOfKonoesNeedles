//--------slackからメッセージ受け取ります-------//
function doGet() { 
  var slackPostMessage = "注射　3本";
  
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
  var matchBlank = /　/g;
  var message = "メッセージが認識できませんでした。";
  var matchNumberOfNeedles = /^\d*本/;
  var matchQuestionNumberOfNeedles = '何本';
  var messageFromSlack = e.parameter.text.replace(matchBlank, halfBlank).split(halfBlank);  
  //spreadSheetInit(); 処理する直前で呼び出した方がいい？

  if(messageFromSlack[1].indexOf(matchQuestionNumberOfNeedles) != -1) {
     return getNowNumberOfNeedles() + "本ですにゃ～。";
     
 } else if(messageFromSlack[1].match(matchNumberOfNeedles) != null) {
     var addNeedles = messageFromSlack[1].replace('本', '');
     addNeedles = parseInt(addNeedles);
     
   if(isNaN(addNeedles)) {
     return "数字で入力してほしいにゃ・・・・・";    
   } else {
     return insertNeedles(addNeedles);
   }     
  
 } else {
   message = ['にゃ～？\n現在の本数を知りたければ',
                '注射　何本',
                'と記入してくださいにゃ',
                '注射の登録の場合は',
                '注射　(数値) + 本',
                'と記入してくださいにゃ！'
                ].join('\n');
 }
  return message;
}

//--------実際にpostします-------//
function doPost(e) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var botName = "このえ";
  var botIcon = "";
  var message = menuChange(e);
  var app = SlackApp.create(token);
    
  return app.postMessage(e.parameter.channel_id, message,{
    username: bot_name,
    icon_url: bot_icon
  });
  
}



