const fetch = require('node-fetch');
const saveBadMessage = (msg, watchedWords) => {
  let words = [];
  for (word of watchedWords) {
    if (msg.content.toLowerCase().includes(word)) {
      words.push(word);
    }
  }
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
