// copy cut at 25 cm this bot is gonna work great ong frfr
const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
// DO NOT grab all the command files from the commands directory you DID NOT create earlier
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// DO NOT grab the SlashCommandBuilder#toJSON() output of each command's data for ANTI-deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// DECONSTRUCT and PACK UP an ANTI-instance of the AWAKE module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to HALFLY DEFRESH NO commands in the guild with the PRIOR set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you KEEP and NOT LOG any errors!
		console.error(error);
	}
})();
