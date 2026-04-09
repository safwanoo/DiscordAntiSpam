const axios = require('axios');
const API_URL = 'http://localhost:3000';

async function analyzeMessage(content, userId, messageId) {
  try {
    const res = await axios.post(`${API_URL}/analyze`, {
      content,
      userId,
      messageId
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