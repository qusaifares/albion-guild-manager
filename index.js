const { Client, RichEmbed, Collection } = require('discord.js');
const client = new Client();
const saveBadMessage = require('./functions/saveBadMessage');
const addMember = require('./functions/addMember');

client.commands = new Collection();
client.aliases = new Collection();

require('dotenv').config();
const watchedWords = process.env.WATCHED_WORDS.split(',');

const handlers = ['command'];

handlers.forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

const playerURL = 'https://gameinfo.albiononline.com/api/gameinfo/players/';
const searchURL = 'http://gameinfo.albiononline.com/api/gameinfo/search?q=';
const guildURL = 'https://gameinfo.albiononline.com/api/gameinfo/guilds/';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // Set the user presence
  if (client.user) {
    client.user.setPresence({
      status: 'online',
      activity: {
        name: 'catching all the egirls',
        type: 'PLAYING'
      }
    });
  }
});

client.on('guildMemberAdd', async member => {
  addMember(member);
});

client.on('message', async msg => {
  // Check if message should be watched and save if yes
  saveBadMessage(msg, watchedWords);
  if (msg.content === `${process.env.PREFIX}addme`) {
    addMember(msg.author);
  }

  // If author is bot, return
  if (msg.author.bot) return;
  // If message isn't in a server, return
  if (!msg.guild) return;
  // If message doesn't start with prefix, return
  if (!msg.content.startsWith(process.env.PREFIX)) return;

  // If message.member is uncached, cache it.
  if (!msg.member) msg.member = await msg.guild.fetchMember(msg);

  const args = msg.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (!cmd.length) return;

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // If a command is finally found, run the command
  if (command) command.run(client, msg, args);
});

client.login(process.env.TOKEN);
