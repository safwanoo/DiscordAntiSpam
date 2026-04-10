const axios = require('axios');
const API_URL = 'backend-service-production-d44a.up.railway.app:3000';

async function analyzeMessage(content, userId, messageId, channelId) {
  try {
    const res = await axios.post(`${API_URL}/analyze`, {
      content,
      userId,
      messageId,
      channelId
    }, {
      timeout: 5000
    });

    return res.data;
  } catch (err) {
    if (err.response) {
      console.error('Backend error response:', err.response.data);
    } else {
      console.error('Error:', err.message);
    }
    // fallback (important so bot doesn't crash)
    return { flagged: false };
  }
}

module.exports = { analyzeMessage };

//this file is responsible for making API calls to the backend server to analyze messages. It sends the message content, user ID, and message ID to the backend and receives a response indicating whether the message is flagged, the action to take, the score, and reasons for the decision.