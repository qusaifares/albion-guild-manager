const fetch = require('node-fetch');
module.exports = {
  name: 'removeprofile',
  category: 'game',
  description: 'Unlinks member from their Albion Online profile.',
  run: async (client, msg, args) => {
    if (args.length) {
      msg.channel.send(
        `Invalid syntax. Simply type in \`${process.env.PREFIX}${this.name}\` to unlink your Albion Online profile.`
      );
      return;
    }

    let body = {
      playerId: '',
      playerName: '',
      isGuildMember: false
    };
    // add guest role and remove member role
    const memberRole = '691474453934375012';
    const guestRole = '691474454454206564';
    msg.member.roles.remove(
      memberRole,
      'Player unlinked their Albion Online account.'
    );
    msg.member.roles.add(guestRole);

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
    msg.channel.send(`Unlinked Albion profile.`);
  }
};
