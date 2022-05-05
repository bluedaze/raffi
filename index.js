const cron = require('cron')
const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const { SlashCommandBuilder } = require('@discordjs/builders');

const job = cron.job(
	'0 10 * * 1', 
	() => console.log('Message every minute'),
	null,
	true,
	'America/New_York'
)
job.start()

const prefix = "!"
client.on("messageCreate", function(message) {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
		
	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();
	console.log("message");
	console.log(message);
	console.log("Command Body:");
	console.log(commandBody);
	console.log("Command:" );
	console.log(command);
	console.log("Args:" );
	console.log(args);
	if (command === "ping"){
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
	}
	else if (command === "zoom"){
		const link = "https://us02web.zoom.us/j/86054725345?pwd=S0s3RmpaMjM4NW9SOU01TWEyTzRCdz09";
		message.author.send(link);
	}
	else if (command === "meeting"){
		message.reply("Monday, 10am");
	}
});

client.login(config.BOT_TOKEN);
