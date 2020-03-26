const fetch = require('node-fetch');
const playerURL = 'https://gameinfo.albiononline.com/api/gameinfo/players/';
const searchURL = 'http://gameinfo.albiononline.com/api/gameinfo/search?q=';
module.exports = {
  name: 'setprofile',
  category: 'game',
  description: 'Links member to their Albion Online profile.',
  run: async (client, msg, args) => {
    // if invalid
    if (args.length !== 1) {
      msg.channel.send(
        `Please include one username. \`${process.env.PREFIX}setprofile <username>\``
      );
      return;
    }

    const searchRes = await fetch(`${searchURL}${args[0]}`);
    const searchData = await searchRes.json();

    if (!searchData.players.length) {
      msg.channel.send('Player not found');
      return;
    }
    const playerData = searchData.players[0];
    let body = {
      playerId: playerData.Id,
      playerName: playerData.Name
    };
    if (playerData.GuildName === 'eGirl Collectors') {
      body.isGuildMember = true;
      const memberRole = msg.guild.roles.fetch('691474454454206564', 'true');
      msg.member.roles.add(memberRole);
      msg.channel.send('✅ eGirl Collectors guild member');
    }

    const memberRes = await fetch(
      `${process.env.SERVER_URL}/api/members/${msg.author.id}/edit`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const memberData = await memberRes.json();
    msg.channel.send(`Linked profile to ${memberData.playerName}`);
  }
};
