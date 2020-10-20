const CronJob = require("cron").CronJob;
const Sms = require("../function/sms")
const model = require("../models/db")
const statusEnum = require("../enum/status.enum")

require("dotenv").config();

const lateAlert = new CronJob("20 3 1 * * *", async function () {
  console.log('start sending late alert')
  const users = await model.user.find({ status: statusEnum.ACTIVE });
  const tels = users.map((member) => member.tel)

  for (const tel of tels) {
    Sms.send({
      to: tel,
      text: "คุณจะเข้างานสายแล้ว",
      from: "timestamp-api",
    })
  }
  console.log('late alert complete')
});

function start() {
  lateAlert.start();
}

function stop() {
  lateAlert.stop();
}

module.exports = {
  start,
  stop,
};
