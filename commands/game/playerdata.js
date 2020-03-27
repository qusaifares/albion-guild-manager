const fetch = require('node-fetch');
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
    } else {
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
      console.log('response', playerData);
      msg.channel.send(
        `Name: ${playerData.Name}\nGuild: ${playerData.GuildName}`
      );
    }
  }
};
