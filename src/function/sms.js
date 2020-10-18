require("dotenv").config();

async function send({ to, text, from }) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: process.env.INFOBIP_AUTH,
    },
  };

  return await axios.post(
    `${process.env.INFOBIP_API}/sms/2/text/single`,
    { to, text, from },
    config
  );
}

module.exports = {
  send,
};
