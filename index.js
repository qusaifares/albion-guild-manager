const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');

require('dotenv').config();

client.commands = new Collection();

const playerURL = 'https://gameinfo.albiononline.com/api/gameinfo/players/';
const searchURL = 'http://gameinfo.albiononline.com/api/gameinfo/search?q=';
const guildURL = 'https://gameinfo.albiononline.com/api/gameinfo/guilds/';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(client.user);
  // Set the user presence
  if (client.user) {
    client.user.setPresence({
      status: 'offline',
      activity: {
        name: 'catching all the egirls',
        type: 'PLAYING'
      }
    });
  }
  console.log(client.user.presence);
});

client.on('message', async msg => {
  // If author is bot, return
  if (msg.author.bot) return;
  // If message isn't in a server, return
  if (!msg.guild) return;
  // If message doesn't start with prefix, return
  if (!msg.content.startsWith(process.env.PREFIX)) return;
  if (msg.content.startsWith('~player')) {
    const playerName = msg.content.substring(8);
    const res = await fetch(searchURL + playerName);
    const data = await res.json();
    const player = data.players[0];
    let msgToSend = '';
    Object.keys(player).forEach(key => {
      msgToSend += `\n ${key}: ${player[key]}`;
      console.log(msgToSend);
    });
    msg.channel.send(msgToSend);
  }
});

client.login(process.env.TOKEN);
