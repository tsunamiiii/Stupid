const Discord = require("discord.js");
const settings = require("./jsons/settings.json");

exports.run = (bot, message, args) => {
if(message.author.id !== settings.myid) return;
try {
message.channel.send(args.join(" ").slice(1));
//bot.channels.get(args.join(" ").slice(0, 18)).send(args.slice(19));
} catch(e) {
message.channel.send(e.message);
}
}