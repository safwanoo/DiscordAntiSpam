const MAX_MESSAGES = 5;//sensitivity of detection window
const AI_COOLDOWN = 30000; 

const conversations = new Map();

function getKey(channelID, userID ){
    return `${channelID}-${userID}`;
}

function updateConversation(channelID, userID, message, messageScore){
    //for now we stick to one channel for simplicity
    const key = getKey (channelID, userID);

    let convo = conversations.get(key);

    if(!convo){
        convo = {
            messages: [],
            score: 0,
            lastAICall:0
        };
    }

    convo.messages.push(message);

    if (convo.messages.length > MAX_MESSAGES) {
        convo.messages.shift();
    }
    convo.score += messageScore;
    console.log(`
    Cumulative conversation score=${convo.score}, 
    message=${convo.messages.length}`);
    conversations.set(key, convo);

    return convo;
}

function shouldTriggerAI(channelID, userID){

    const key = getKey(channelID, userID);
    const convo = conversations.get(key);
    const now = Date.now();

    if (!convo) return false;

    // cooldown
    if (now - convo.lastAICall < AI_COOLDOWN){
        return false;   
    }

    if (convo.score < 6){
        return false;
    }

    const combinedText = convo.messages.join(' ').toLowerCase();

    // 🔥 Strong signals
    const hasLink = /(http|www)/.test(combinedText);
    const hasPayment = /(pay|payment|transfer|bank)/.test(combinedText);
    const hasUrgency = /(now|urgent|fast|quick|asap)/.test(combinedText);

    // 🔹 Weak signal (DO NOT use alone)
    const hasDM = /(dm me|pm me)/.test(combinedText);

    // 🔥 NEW LOGIC (better)
    if (hasLink && hasPayment) return true;          // 🚨 strongest
    if (hasLink && hasUrgency) return true;          // 🚨 phishing style
    if (hasPayment && hasUrgency) return true;       // 🚨 pressure scam

    // ⚠️ Optional: DM only matters IF combined with something risky
    if (hasDM && hasLink && convo.score >= 7) return true;

    return false;
}

function markAICall(channelID, userID){
    const key = getKey (channelID, userID);
    const convo = conversations.get(key);

    if(convo){
        convo.lastAICall = Date.now();
        convo.score = 0; 
    }
}

module.exports = {
    updateConversation,
    shouldTriggerAI,
    markAICall
};