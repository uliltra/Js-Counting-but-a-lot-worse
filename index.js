//what am i even doing here
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    if (Math.floor(Math.random() * 100) == 0) {
        fs.writeFileSync('number.txt', Math.floor(Math.random() * 1000).toString());
    }
    let currentNumber = parseInt(fs.readFileSync('number.txt'));
    for (let i = 0; i < client.channels.cache.size; i++) {
        if (client.channels.cache.at(i).name.includes('counting')) {
            client.channels.cache.at(i).send(`The current number is ${currentNumber}.`);
        }
    }
});

client.login(token);

const insults = [
    'haha no lol restart',
    'L',
    'mega cringe',
    'no father',
    'failed first grade math',
    'ratio',
    'utter ignoramus',
    'room temperature iq',
    'no wenches',
    'bozo',
    'doesn\'t own an air fryer',
    'foolish mistake',
    'completely inert',
    'erroneous course of action',
    'failure on all mental levels',
    'unable to do basic arithmetic',
    'you possess no raisins',
    'numbskull',
    '3.82 brain cells total',
    'complete neuron shutdown'
];

client.on('messageCreate', async message => {
    if (!message.channel.name.includes('counting')) { // not generally good implementation but ehhhhhhhh
        return;
    }
    if (isNaN(message.content) || message.attachments.size) {
        return;
    }
    let currentNumber = parseInt(fs.readFileSync('number.txt'));
    if (parseInt(message.content) !== currentNumber + 1) {
        fs.writeFileSync('number.txt', '0');
        await message.react('🗿');
        await message.reply(insults[Math.floor(Math.random() * insults.length)])
        console.log('failure');
        return;
    } else {
        currentNumber++;
        let newNumber = currentNumber++;
        fs.writeFileSync('number.txt', newNumber.toString());
        await message.react('🅱️');
        console.log(newNumber);
        return;
    }
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});