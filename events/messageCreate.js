const { Events }   = require('discord.js');
const { analyzeMessage } = require('../services/apiServices');
require('dotenv').config();
const channelID = process.env.CHANNEL_ID;

module.exports = {

    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;

        if (message.channel.id !== channelID) return;

        console.log(`Message detected : ${message.content}`);

        //basic spam filtering and scoring ( single message scope )
        const result = await analyzeMessage(
            message.content,
            message.author.id,
            message.id,
            message.channel.id
        );


            console.log (`Analysis result: 
            flagged : ${JSON.stringify(result.flagged)}
            action : ${result.action}
            score : ${result.score}
            reasons : ${JSON.stringify(result.reasons)}
            `);

            // ==================================
            // message handling based on analysis
            // ==================================
            
            // 🚫 Block
            if (result.action === 'block') {
            await message.delete();
            await message.channel.send(`⚠️ Message from <@${message.author.id}> was removed due to: ${result.reasons.join(', ')} contact admin if you think this was a mistake.`);

            return;
            }

            // ⚠️ Suspicious
            if (result.action === 'review') {
            await message.react('⚠️');
            return;
            }
            //if the ruling is vague, need ai to weigh in on the analysis and make a final decision
            // if (result.action === 'review') {
            //     const aiResult = await analyzeWithAI(content);
            // }

            // ✅ Safe
            await message.react('✅');

    }

}

//this file is responsible for listening to new messages in the specified channel and analyzing them for spam or inappropriate content. 
//If a message is flagged, it will be deleted and a warning will be sent to the channel.