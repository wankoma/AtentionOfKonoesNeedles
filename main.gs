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
  var blank = "　";
  var message = "メッセージが認識できませんでした。";
  var matchNumberOfNeedles = /^\d*本/;
  var matchQuestionNumberOfNeedles = '何本';
  /* ebisawa: このreplaceは受けっとたメッセージに含まれる全角スペースを半角スペースに変換する処理っぽそうなんだけど、
  JavaScriptのreplaceにはトラップがあって、最初にヒットした文字しか置換してくれない（つまり1回のみ）
  もし受け取ったメッセージに含まれる全角スペースを全部置換したいならこう
  e.parameter.text.replace(/　/g, ' ');
  https://marycore.jp/prog/js/replace-all/ 
  （//で文字を囲むのはJavaScriptだと「正規表現文字列ですよ」の意味になる
  　gはglobalという意味で、文字列内すべてを走査するという意味になる）*/
  var messageFromSlack = e.parameter.text.replace(blank, halfBlank).split(halfBlank);
  
  spreadSheetInit();
  
  /* ebisawa: このif文でmessageにテキストを入れて返してるけど、適宜返してあげてよさそう
    if(messageFromSlack[1].indexOf(matchQuestionNumberOfNeedles) != -1) {
     return getNowNumberOfNeedles() + "本ですにゃ～。";
     
 } else if(messageFromSlack[1].match(matchNumberOfNeedles) != null) {
     addNeedles = messageFromSlack[1].replace('本', '');
     addNeedles = parseInt(addNeedles);
     
   if(isNaN(addNeedles)) {
     return "数字で入力してほしいにゃ・・・・・";
     
   } else {
     return insertNeedles(addNeedles);
   }
     
  
 } 
 …
 的な！
  */
  if(messageFromSlack[1].indexOf(matchQuestionNumberOfNeedles) != -1) {
     message = getNowNumberOfNeedles() + "本ですにゃ～。";
     
 } else if(messageFromSlack[1].match(matchNumberOfNeedles) != null) {
   // ebisawa: addNeedlesがvarを使って宣言されてないのでグローバル変数になってそう
     addNeedles = messageFromSlack[1].replace('本', '');
     addNeedles = parseInt(addNeedles);
     
   if(isNaN(addNeedles)) {
     message = "数字で入力してほしいにゃ・・・・・";
     
   } else {
     message = insertNeedles(addNeedles);
   }
     
  
 } else {
   /* ebisawa:
   message = [
     'にゃ～？',
     '現在の本数を知りたければ',
     '注射　何本',
     'と記入してくださいにゃ',
   ].join('\n');
   みたいな感じにしてあげると見やすいかも（行数は増えるが）
   */
     message = "にゃ～？\n現在の本数を知りたければ\n　注射　何本 \nと記入してくださいにゃ\n注射の登録の場合は\n 　注射　(数値) + 本 \nと記入してくださいにゃ！"
 }
  return message;
}

//--------実際にpostします-------//
function doPost(e) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  // ebisawa: JavaScriptはcamelCase推奨だったと思う
  var bot_name = "このえ";
  var bot_icon = "";
  var message = "";
  // ebisawa: encodingOptionCodeは使ってなさそう
  var encodingOptionCode = "camel";
  var app = SlackApp.create(token);
  
  message = menuChange(e);
    
  
  return app.postMessage(e.parameter.channel_id, message,{
    username: bot_name,
    icon_url: bot_icon
  });
  
}



