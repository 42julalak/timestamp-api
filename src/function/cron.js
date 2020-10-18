const CronJob = require("cron").CronJob;

require("dotenv").config();

const job = new CronJob("* * * * * *", function () {
  console.log("You will see this message every second");
});

function start() {
  job.start();
}

function stop() {
  job.stop();
}

module.exports = {
  start,
  stop,
};
