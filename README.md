**🚀 Discord AI Anti-Scam Bot**

An intelligent Discord moderation system that detects scams and spam using rule-based scoring, conversation analysis, and AI verification.

**📌 Project Explanation**

This project is a real-time Discord moderation bot designed to detect and prevent scams, spam, and malicious messages—especially in community marketplaces and trading channels.

It combines three layers of detection:

**🔍 1. Single Message Scoring (Rule-Based)**

Each message is analyzed individually using a scoring system based on:

Keyword detection (e.g. “free money”, “pay first”)
Fuzzy matching (detects obfuscated words like fr33 m0ney)
Links and call-to-action phrases
Urgency language (“hurry”, “limited”)
Suspicious formatting (ALL CAPS, repeated characters)

👉 Fast, low-cost filtering for obvious threats

**🧠 2. Conversation-Based Detection**

Instead of relying only on single messages, the system tracks:

Message sequences per user
Accumulated risk score over time
Behavioral patterns (payment intent, off-platform movement)

👉 Detects slow-burn scams that look harmless individually

**🤖 3. AI Verification Layer**

When a conversation becomes suspicious but not conclusive:

Messages are sent to an AI model
AI determines if it’s likely a scam
Returns structured output (flagged, confidence, reason)

👉 Reduces false positives and catches subtle manipulation

⭐ Key Features
⚡ Intelligent multi-layer detection system
🧍 Per-user conversation tracking
🚫 Automatic filtering of high-risk messages (no AI needed)
💸 Optimized AI usage (only triggered when necessary)
🧠 Detects obfuscated scam attempts
🔄 Real-time Discord integration
🌍 Future Potential
Support for other platforms (WhatsApp, Telegram)
Scam pattern learning system
User reputation tracking
Admin dashboard for moderation insights
🛠️ Tech Stack
Node.js (Express backend)
Discord.js (bot integration)
Axios (API communication)
OpenAI API (AI analysis)
⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo
2. Install dependencies
Bot (root)
npm install
Backend
cd backend-server
npm install
3. Environment Variables

Create a .env file in both root and backend:

📁 Root (.env)
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_client_id
GUILD_ID=your_guild_id
📁 backend-server/.env
OPENAI_API_KEY=your_openai_api_key
PORT=3000
▶️ How to Run
1. Start Backend Server
cd backend-server
node server.js
2. Start Discord Bot
node index.js
✅ Test Backend

Open in browser:

http://localhost:3000/health
✅ Test Bot
Send messages in your Discord server
Bot will:
Analyze messages
Score risk
Trigger AI if needed
React or flag messages
🚀 Deployment (Production)
Deploy backend and bot separately on Railway
Use environment variables instead of config files
Connect bot to backend using deployed API URL
🧠 Architecture Overview
Discord Server
     ↓
Discord Bot (discord.js)
     ↓
Backend API (Express)
     ↓
Scoring + Conversation Engine
     ↓
AI (only when needed)
🔐 Security Notes
Never expose .env or tokens
Use environment variables in production
Rotate tokens if leaked
👨‍💻 Author

Built as a smart moderation system for detecting scams in community-driven marketplaces and chat environments.
