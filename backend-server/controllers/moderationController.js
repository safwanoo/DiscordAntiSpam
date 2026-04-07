const { get } = require('http');

async function analyzeMessage(req, res) {
const { content, userId , messageId } = req.body;

  console.log(`Incoming message from ${userId}: ${content} : ${messageId}` );

  // 🔥 Basic filtering logic (cheap layer)

 if (content.toLowerCase().includes('http')) {
    return res.json({
      flagged: true,
      reason: 'Suspicious link detected',
      messageId
    });
  }
   
    const fs = require('fs');

    function getFilterWords() {
    const data = JSON.parse(fs.readFileSync('./data/filters.json'));
    return data.words;
    }


    function containSpam(content) {
    const word = getFilterWords();
    const text = content.toLowerCase();

    return word.find(word => text.includes(word));
}

const matchedWord = containSpam(content);

  if (matchedWord) {
    return res.json({
      flagged: true,
      reason: `Spam detected: ${matchedWord}`,
      messageId
    });
  }
 

  // Default safe
  return res.json({
    flagged: false,
    reason: null, 
    messageId
  });
}

module.exports = { analyzeMessage };