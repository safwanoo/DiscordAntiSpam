const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeConversation(messages) {
  try {
    const response = await client.responses.create({
      model: "gpt-4o",
      input: `
You are a scam detection AI for marketplace conversations.

Rules:
- Normal buying/selling is NOT a scam
- Only flag if there are clear scam patterns:
  - payment before delivery + pressure
  - suspicious links
  - manipulation or deception

Return ONLY JSON:
{
  "flagged": boolean,
  "confidence": number,
  "reason": "short explanation"
}

Conversation:
${messages.join('\n')}
`
    });

    function extractJSON(text) {
      const match = text.match(/\{[\s\S]*\}/);
      return match ? match[0] : null;
    }
    const output = response.output_text;

    // 🔥 Parse AI response safely
    try {

      const cleanedJson = extractJSON(output);
      console.log('Raw AI output:', cleanedJson);
      return JSON.parse(cleanedJson);

    } catch (parseError) {
      console.error('AI JSON parse error:', output);

      return {
        flagged: false,
        confidence: 0,
        reason: 'Invalid AI response format'
      };
    } 

  } catch (err) {
    console.error('AI error:', err.message);

    return {
      flagged: false,
      confidence: 0,
      reason: 'AI request failed'
    };
  }
}

module.exports = { analyzeConversation };