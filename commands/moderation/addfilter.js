const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addfilter')
    .setDescription('Add a new spam keyword')
    .addStringOption(option =>
      option.setName('word')
        .setDescription('Word or phrase to filter')
        .setRequired(true)
    ),

  async execute(interaction) {
    const word = interaction.options.getString('word').toLowerCase();

    const filePath = './backend-server/data/filter-words.json';
    const data = JSON.parse(fs.readFileSync(filePath));

    // Prevent duplicates
    if (data.words.includes(word)) {
      return interaction.reply({
        content: '⚠️ Word already exists!',
        ephemeral: true
      });
    }

    data.words.push(word);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return interaction.reply({
      content: `✅ Added filter word: "${word}"`,
      ephemeral: true
    });
  }
};