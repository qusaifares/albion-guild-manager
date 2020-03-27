const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const playerURL = 'https://gameinfo.albiononline.com/api/gameinfo/players/';
module.exports = {
  name: 'playerdata',
  category: 'game',
  description: 'Returns Albion Online player information.',
  run: async (client, msg, args) => {
    if (
      !msg.mentions.users.array().length ||
      msg.mentions.users.array().length > 1
    ) {
      msg.channel.send('Please choose one player');
      return;
    }
    const mention = msg.mentions.users.first(1)[0];

    // fetch member data from server
    const memberRes = await fetch(
      `${process.env.SERVER_URL}/api/members/${mention.id}`
    );
    const member = await memberRes.json();
    // if member not found
    if (!member) {
      msg.channel.send('Member not found');
      return;
    }
    // if member doesn't have player id
    if (!member.playerId) {
      msg.channel.send(
        `Please link your Albion profile by typing \`${process.env.PREFIX}setprofile <username>\``
      );
      return;
    }
    // fetch player info from Albion API
    const playerRes = await fetch(`${playerURL}${member.playerId}`);
    const playerData = await playerRes.json();

    const embedMsg = new MessageEmbed()
      .setColor([73, 20, 9])
      .setTitle(`${mention.username}'s Albion Online Profile`)
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setURL(`https://albiononline.com/en/killboard/player/${playerData.Id}`)
      .setThumbnail(mention.displayAvatarURL())
      .addFields(
        { name: 'Name', value: playerData.Name },
        { name: 'Guild', value: playerData.GuildName },
        { name: 'Kill Fame', value: playerData.KillFame, inline: true },
        { name: 'Death Fame', value: playerData.DeathFame, inline: true },
        { name: 'Fame Ratio', value: playerData.FameRatio, inline: true }
      )
      .setTimestamp();

    msg.channel.send(embedMsg);
  }
};
