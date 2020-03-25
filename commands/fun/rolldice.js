const fetch = require('node-fetch');
const playerURL = 'https://gameinfo.albiononline.com/api/gameinfo/players/';
module.exports = {
  name: 'rolldice',
  category: 'fun',
  description: 'Rolls a die.',
  run: async (client, msg, args) => {
    const num = Math.floor(Math.random() * 6);
    msg.reply(`You rolled a ${num}.`);
  }
};
