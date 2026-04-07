const { Events }   = require('discord.js');
const { analyzeMessage } = require('../services/apiServices');
const { channelID } = require('../config.json');

module.exports = {

    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;

        if (message.channel.id !== channelID) return;

        console.log(`Message detected : ${message.content}`);

        const result = await analyzeMessage(
            message.content,
            message.author.id,
            message.id
        );

        if (result.flagged){
            console.log(`Message flagged: ${result.reason}`);
            await message.react("🚨");
            await message.channel.send(`⚠️ ${result.reason}`);
        }else{
        await message.react('👀');
        console.log(`message approved`);
        }    
    }

}

//this file is responsible for listening to new messages in the specified channel and analyzing them for spam or inappropriate content. 
//If a message is flagged, it will be deleted and a warning will be sent to the channel.