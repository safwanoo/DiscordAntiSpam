const {scoreMessage} = require('../services/scoringService');
const { updateConversation, shouldTriggerAI, markAICall } = require('../services/conversationServer');
const { analyzeConversation } = require('../services/aiService'); 

const { get } = require('http');

async function analyzeMessage(req, res) {
  const { content, userId , messageId ,channelId} = req.body;
  const { score, reasons } = scoreMessage(content);
  
  console.log(`
  Incoming message from ${userId}:${content}
  word score: ${score}` );

  let flagged = false;
  let action = 'allow'
 
    
  // update conversation 
  const conversation = updateConversation(
    channelId,
    userId,
    content,
    score
  );


  //decide if the score is higher than or equal to 5 block action
  if (score >= 5) {
    flagged = true;
    action = 'block';
  }else if( score >=3) {
    action = 'review';//send to AI later
    console.log('🚨 Triggering AI for this message');

    let aiResult = null;

    aiResult = await analyzeConversation(conversation.messages);
    markAICall(channelId, userId);

    if (aiResult?.flagged) {
      flagged = true;
      action = 'block';
      reasons.push(`AI: ${aiResult.reason}
        AI confidence: ${aiResult.confidence}`);
    }
  } 



  let aiResult = null;

  if (shouldTriggerAI(channelId, userId)){
    
    console.log('🚨 Triggering AI for conversation');

    aiResult = await analyzeConversation(conversation.messages);
    markAICall(channelId, userId);
    
    if (aiResult?.flagged) {
        flagged = true;
        action = 'block';
        reasons.push(`AI: ${aiResult.reason}
          AI confidence: ${aiResult.confidence}`);
    }
  }

  return res.json({
    flagged,
    action,
    score,
    reasons,
    messageId
  });
}

module.exports = { analyzeMessage };