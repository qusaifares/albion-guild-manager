const fetch = require('node-fetch');
const saveBadMessage = (msg, watchedWords) => {
  let words = [];
  // list the watched words that were use
  for (word of watchedWords) {
    if (msg.content.toLowerCase().includes(word)) {
      words.push(word);
    }
  }
  // if 1 or more words were used, save message
  if (words.length) {
    const msgBody = {
      _id: msg.id,
      memberId: msg.author.id,
      discordTag: msg.author.tag,
      channel: msg.channel.id,
      content: msg.content,
      words
    };
    fetch(`${process.env.SERVER_URL}/api/badMessages/new`, {
      method: 'POST',
      body: JSON.stringify(msgBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(console.error);
  }
};

module.exports = saveBadMessage;
