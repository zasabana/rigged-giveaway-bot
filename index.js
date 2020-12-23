const express = require("express")
const app = express();
const Discord = require('discord.js')
const client = new Discord.Client();
const port = 3000
const prefix = "!"
app.get('/', (req, res) => res.send('hey bud'))
client.once('ready', () => {
    console.log('Bot is ready!');
    client.user.setActivity(`@kazion#1337`, {
        type: "WATCHING",
    });
});
app.listen(port, () =>
console.log(`Your app is listening at https://localhost:${port}`)
);

client.on('message', message =>{
  if (message.content === `${prefix}test-command`){
    message.reply('Test command works')
  }
})




client.on("message", message =>{
  if (message.content.indexOf(prefix) !== 0) return;
   const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    // The list of if/else is replaced with those simple 2 lines:
    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args);
     
    } catch (err) {
     return;
    }

})
client.login(process.env.TOKEN)
