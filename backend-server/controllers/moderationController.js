const {scoreMessage} = require('../services/scoringService');
const { get } = require('http');

async function analyzeMessage(req, res) {
  const { content, userId , messageId } = req.body;
  const { score, reasons } = scoreMessage(content);
  
  console.log(`Incoming message from ${userId}: ${content} : ${messageId}` );

  let flagged = false;
  let action = 'allow'
 
  //decide if the score is higher than or equal to 5 block action
  if (score >= 5) {
    flagged = true;
    action = 'block';
  }else if( score >=3) {
    action = 'review';//send to AI later
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