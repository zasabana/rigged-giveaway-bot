const Discord = module.require("discord.js");
const ms = require("ms")
module.exports.run = async (client, message, args) => {
  if (message.author.id != "763188423208861706") return;
  // put your account ID above so only YOU can execute the command
    // !giveaway {time s/m/d} {item}
    function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
    const messageArray = message.content.split(" ");
    
    var item = "";
    var time;
    var winnerCount;
    for (var i = 1; i < args.length; i++) {
      item += (args[i] + " ");
    }
    time = args[0];
    if (!time) {
      return message.channel.send(`Invalid duration provided`);
    }
    if (!item) {
      item = "No title"
    }
    var embed = new Discord.MessageEmbed();
    embed.setColor(0x3333ff);
    embed.setTitle("New Giveaway !");
    embed.setDescription("**" + item + "**");
    embed.addField(`Duration : `, ms(ms(time), {
      long: true
    }), true);
    embed.setFooter("React to this message with 🎉 to participate !");
    var embedSent = await message.channel.send(embed);
    embedSent.react("🎉");

    setTimeout(async () => {
      try{
        const peopleReactedBot = await embedSent.reactions.cache.get("🎉").users.fetch();
        var peopleReacted = peopleReactedBot.array().filter(u => u.id !== client.user.id);
      }catch(e){
        return message.channel.send(`An unknown error happened during the draw of the giveaway **${item}** : `+"`"+e+"`")
      }
      var winner;

      if (peopleReacted.length <= 0) {
        return message.channel.send(`Not enough participants to execute the draw of the giveaway **${item}** :(`);
      } else {
        var index = Math.floor(Math.random() * peopleReacted.length);
        winner = peopleReacted[index];
      }
      if (!winner) {
        message.channel.send(`An unknown error happened during th draw of the giveaway **${item}**`);
      } else {
        console.log(`Giveaway ${item} won by ${winner.toString()}`)
        message.channel.send(`🎉 **<@userid_here>** has won the giveaway **${item}** ! Congratulations ! 🎉`);
      }
    }, ms(time));
}

// above where it says "userid_here" put the userid of the winner you want it to be

module.exports.help = {
 name: "giveaway",
  description: "Starts a giveaway",
  usage: "!giveaway-start"
};
