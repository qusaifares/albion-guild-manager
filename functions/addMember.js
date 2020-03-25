const fetch = require('node-fetch');
const addMember = async member => {
  // checks if the member already exists
  const memberCheckRes = await fetch(
    `${process.env.SERVER_URL}/api/members/${member.id}`
  );
  const memberCheckData = await memberCheckRes.json();
  if (memberCheckData) return;
  // create member
  const memberBody = {
    _id: member.id,
    tagOnJoin: member.tag
  };
  fetch(`${process.env.SERVER_URL}/api/members/new`, {
    method: 'POST',
    body: JSON.stringify(memberBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(console.error);
};

module.exports = addMember;
