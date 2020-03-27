const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const searchURL = 'http://gameinfo.albiononline.com/api/gameinfo/search?q=';
const guildURL = 'https://gameinfo.albiononline.com/api/gameinfo/guilds/';
module.exports = {
  name: 'guild',
  category: 'game',
  description: 'Returns Albion Online guild information.',
  run: async (client, msg, args) => {
    if (!args.length) {
      msg.channel.send(
        `Please include a guild name \`${process.env.PREFIX}guild <guild name>\``
      );
      return;
    }
    const guildName = args.join(' ');

    const searchRes = await fetch(`${searchURL}${encodeURI(guildName)}`);
    const searchData = await searchRes.json();
    if (!searchData.guilds.length) {
      msg.channel.send('No guild found. Make sure to include proper spacing.');
      return;
    }
    const guildId = searchData.guilds[0].Id;

    const guildRes = await fetch(`${guildURL}${guildId}`);
    const guildData = await guildRes.json();

    const guildEmbed = new MessageEmbed()
      .setColor([73, 20, 9])
      .setTitle(guildData.Name)
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setURL(`https://albiononline.com/en/killboard/guild/${guildData.Id}`)
      .addFields(
        { name: 'Name', value: guildData.Name },
        { name: 'Founder', value: guildData.FounderName },
        {
          name: 'Founded',
          value: guildData.Founded.slice(0, 10)
        },
        { name: 'Kill Fame', value: guildData.killFame, inline: true },
        { name: 'Death Fame', value: guildData.DeathFame, inline: true },
        { name: 'Members', value: guildData.MemberCount, inline: true }
      )
      .setTimestamp();
    msg.channel.send(guildEmbed);
  }
};
