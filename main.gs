//--------slackからメッセージ受け取ります-------//
function doGet(e) {   
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
  var message = "";
  var messageFromSlack = e.parameter.text.replace(blank, halfBlank).split(halfBlank);
  
  return messageFromSlack[1];
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



