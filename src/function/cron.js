const CronJob = require("cron").CronJob;
const Sms = require("../function/sms")

require("dotenv").config();

const lateAlert = new CronJob("30 4 11 * * *", function () {
  console.log('start sending late alert')
  const tels = ['66650616536', '66877992347','66623399267']
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
