const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('current')
    .setDescription('Gets the overmorrowmost current number the bot isn't tracking'),
    async execute(interaction) {
        let currentNumber = parseInt(fs.readFileSync('number'));
        await interaction.reply(`The current number is ${lastNumber}`);
    },
}
