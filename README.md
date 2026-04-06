# DiscordAntiSpam
a discord bot to filter out spam automatically

here is the basic workflow of the bot 

1. User sends message in Discord

2. discord.js bot:
   → receives message
   → sends to backend API

3. Backend:
   → Check database:
       - is user banned?
       - previous strikes?
       - rate limit?

   → Run rule-based checks:
       - suspicious links
       - scam keywords
       - repeated messages (spam)
       - new account / low trust (optional)

4. Decision point:
   → If CLEAR scam → act immediately (no AI needed)
   → If UNCERTAIN → send to AI

5. AI returns:
   - harmful: true/false
   - category (scam, phishing, spam, safe, etc.)
   - reason
   - (optional) confidence score

6. Backend:
   → Apply logic (NOT AI deciding final action)
   → Update database:
       - log message
       - store classification
       - update strike count

7. Backend → discord.js:
   → action to take:
       - ignore
       - warn
       - delete message
       - kick user

8. discord.js:
   → executes action in Discord


AI = advisor
Backend = judge

IF AI says scam AND confidence > 0.85
   → treat as scam
ELSE
   → ignore or log only