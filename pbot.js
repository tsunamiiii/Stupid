const Discord = require('discord.js');
const snek = require("snekfetch");
const fs = require('fs');
const settings = require('./commands/jsons/settings.json');
const bot = new Discord.Client();
const pfix = 'SB;';
const { stringify } = require('querystring');
const { request } = require('https');
const DiscordBoats = require('dboats-api');
//const boats = new DiscordBoats({token: process.env.dbatoken});
   
bot.on("ready", () => {
console.log('[Stupid] Stupidbot running on version 1.0.0');
bot.channels.get('564951236487675914').send('Stupid was restarted, back up now'); //work damn you
//bot.user.setStatus('idle');
bot.user.setActivity(`${bot.guilds.size} servers | sb;help`, {type: "LISTENING"});
});
bot.on("guildCreate", guild => { 
bot.user.setActivity(`${bot.guilds.size} servers | sb;help`, {type: "LISTENING"});
bot.channels.get('570418229441331210').send(new Discord.RichEmbed()
.setAuthor(`Owner: ${guild.owner.user.tag} | ${guild.owner.user.id}`)                                    
.setTitle(`New Server: ${guild.name} | ${guild.id}`)
.setDescription(`Now in ${bot.guilds.size} servers`)
.setColor('RANDOM'));
});
bot.on("guildDelete", guild => { 
bot.user.setActivity(`${bot.guilds.size} servers | sb;help`, {type: "LISTENING"});
bot.channels.get('570418229441331210').send(new Discord.RichEmbed()
.setTitle(`Left a Server: ${guild.name} | ${guild.id}`)
.setDescription(`Now in ${bot.guilds.size} servers`)
.setColor('RANDOM'));
});

bot.on('message', message => {
if(settings.gbl.includes(message.guild.id)) return;
let msg = message.content.toUpperCase();
let user = message.author; //ive never used this rip
let args = message.content.slice(pfix.length).trim().split(' ');
let cmd = args.shift().toLowerCase();
if(user.bot) return;
if(message.channel.topic != null) {
if(message.channel.topic.includes("Stupid:Disable")) return;
}
if (!msg.startsWith(pfix)) return;
let regx = /^((?:https?:)?\/\/)?((?:www|m)\.)? ((?:discord\.gg|discordapp\.com))/g
let check = regx.test(message.content.toLowerCase().replace(/\s+/g, ''))
if(check.includes("discord")) return message.channel.send("yes");
try{
let commandFile = require(`./commands/${cmd}.js`);
commandFile.run(bot, message, args);
} catch(e) {
bot.channels.get('565011678203215892').send(new Discord.RichEmbed()
.setTitle(`Server: ${message.guild.name}`)
.setAuthor(message.author.tag)                                    
.setDescription(e.message)
.setColor([255, 0, 0]));
if(message.guild.id == '264445053596991498') return; 
 let err = new Discord.RichEmbed()
.setTitle('Error')
.setDescription('```' + e.message + '```')
.setColor([255, 0, 0]);
message.channel.send({embed: err});
                                           
}
});

bot.login(process.env.TOKEN)
