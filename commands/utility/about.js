const {SlashCommandBuilder ,EmbedBuilder} = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder().setName('about').setDescription('Provides information about the bot.'),
    async execute(interaction){

        const client = interaction.client;
        const app = await client.application.fetch();

         const embed = new EmbedBuilder()
            .setColor(0xff0000) // red theme
            .setTitle('🤖 About This Bot')
            .setDescription(`This Bot is ${app.description} and is currently on version ${app.version}. Created by ${app.owner}.`)
            .addFields(
                { name: '🏓 Ping', value: `${client.ws.ping}ms`, inline: true },
                { name: '🌍 Servers', value: `${client.guilds.cache.size}`, inline: true },
                { name: '⏱️ Uptime', value: `${Math.round(client.uptime / 1000 / 60)} minutes`, inline: true }
            )
            .setFooter({ text: 'Bot Status Panel' });

        await interaction.reply({ embeds: [embed] });

    }
}