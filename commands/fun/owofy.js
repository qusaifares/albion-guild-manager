const owofy = require('owofy');
module.exports = {
  name: 'owofy',
  category: 'fun',
  description: 'For all of your owo and uwu needs.',
  run: async (client, msg, args) => {
    if (!args.length)
      msg.channel.send(
        `Include a sentence in the command \`${process.env.PREFIX}owofy <sentence here>\``
      );
    const owoMsg = owofy(args.join(' '));
    msg.channel.send(owoMsg);
  }
};
