/*
* Slackからメッセージを受け取ります.
* 実質mainメソッド
* 
* @param e: slackのpostパラメタ
*/
function doPost(e) { 
  
  if(e.parameter.user_name != "slackbot"){
    e.parameter.text = menuChange(e);
    doPostMessage(e); 
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
  var matchNumberOfNeedles = /^\d*本/;
  var matchQuestionNumberOfNeedles = '何本';
  var messageFromSlack = e.parameter.text.replace(matchBlank, halfBlank).split(halfBlank);  
  
  if(messageFromSlack[1].indexOf(matchQuestionNumberOfNeedles) != -1){
    return getNowNumberOfNeedles() + "本ですにゃ～";
    
  } else if(messageFromSlack[1].match(matchNumberOfNeedles) != null) {
    var addNeedles = messageFromSlack[1].replace('本', '');
    addNeedles = parseInt(addNeedles);
    
    if(isNaN(addNeedles))return "数字で入力してほしいにゃ・・・・・";    
    return insertNeedles(addNeedles);    
    
  } else {
    var errorMessage = ['にゃ～？\n現在の本数を知りたければ',
                        '注射　何本',
                        'と記入してくださいにゃ',
                        '注射の登録の場合は',
                        '注射　(数値) + 本',
                        'と記入してくださいにゃ！'
                       ].join('\n');
    return errorMessage;
  }
}





