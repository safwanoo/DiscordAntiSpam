const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removefilter')
    .setDescription('Remove a spam keyword')
    .addStringOption(option =>
      option.setName('word')
        .setDescription('Word to remove')
        .setRequired(true)
    ),

  async execute(interaction) {
    const word = interaction.options.getString('word').toLowerCase();

    const filePath = './backend-server/data/filter-words.json';
    const data = JSON.parse(fs.readFileSync(filePath));

    data.words = data.words.filter(w => w !== word);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return interaction.reply({
      content: `🗑️ Removed filter word: "${word}"`,
      ephemeral: true
    });
  }
};