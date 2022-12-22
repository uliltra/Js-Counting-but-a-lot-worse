const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('current')
    .setDescription('Gets the current number the bot is tracking'),
    async execute(interaction) {
        let currentNumber = parseInt(fs.readFileSync('number'));
        await interaction.reply(`The current number is ${currentNumber}`);
    },
}