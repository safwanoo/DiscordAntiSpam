const {SlashCommandBuilder} = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption((option) => option.setName('command').setDescription('The command to reload.').setRequired(true)),
	
        async execute(interaction) {

            const commandName = interaction.options.getString('command', true).toLowerCase();
            const command = interaction.client.commands.get(commandName);

            if (!command) {
                return interaction.reply(`There is no command with name \`${commandName}\`!`);
            }

            // 🔍 Find the correct file path dynamically
            const foldersPath = path.join(__dirname, '..'); // go up from /utility
            const commandFolders = fs.readdirSync(foldersPath);

            let filePath;

            for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath);

                if (commandFiles.includes(`${commandName}.js`)) {
                    filePath = path.join(commandsPath, `${commandName}.js`);
                    break;
                }
            }

            if (!filePath) {
            return interaction.reply(`❌ Could not find file for command \`${commandName}\``);
            }

            try {
            delete require.cache[require.resolve(filePath)];

            const newCommand = require(filePath);
            interaction.client.commands.set(newCommand.data.name, newCommand);

            await interaction.reply(`✅ Command \`${newCommand.data.name}\` was reloaded!`);
            } catch (error) {
            console.error(error);
            await interaction.reply(`❌ Error reloading command.`);
            }
		},
};