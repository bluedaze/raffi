#!/usr/bin/env node
const cron = require('cron')
const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

console.log("Starting...")

client.on("ready", () => {
	const guild = client.guilds.cache.get("971439306763800586")
	const channel = guild.channels.cache.get('971439306763800589'); 
	var job = cron.job(
		'0 10 * * 1',
		function() {
			channel.send("Rise and shine, it's time for another zoom extravaganza!");
			channel.send("Come join at the following link: https://us02web.zoom.us/j/86054725345?pwd=S0s3RmpaMjM4NW9SOU01TWEyTzRCdz09");
		},
		null,
		true,
		'America/New_York'
	);
});

const prefix = "!"
client.on("messageCreate", function(message) {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
		
	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();
	if (command === "ping"){
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
	}
	else if (command === "zoom"){
		const link = "https://us02web.zoom.us/j/86054725345?pwd=S0s3RmpaMjM4NW9SOU01TWEyTzRCdz09";
		message.author.send(link);
		message.reply("Direct message with zoom link has been sent to you.")
	}
	else if (command === "meeting"){
		message.reply("Monday, 10am");
	}
});

client.login(config.BOT_TOKEN);
