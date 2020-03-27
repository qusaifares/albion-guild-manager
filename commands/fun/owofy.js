const owofy = require('owofy');
module.exports = {
  name: 'owofy',
  category: 'fun',
  description: 'For all of your owo and uwu needs.',
  run: async (client, msg, args) => {
    const owoMsg = owofy(args.join(' '));
    msg.channel.send(owoMsg);
  }
};
