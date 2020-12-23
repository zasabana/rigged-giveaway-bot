const Discord = module.require("discord.js");
module.exports.run = async (client, message, args) => {
  message.channel.send('Pinging...').then(sent => {
    sent.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`);
});
}

module.exports.help = {
 name: "ping",
  description: "Gets a ping",
  usage: "ping"
};
