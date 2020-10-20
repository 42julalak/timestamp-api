const dayjs = require("dayjs");

require("dotenv").config();

const workTime = {
  hour: 14, //format (0 -23)
  minute: 00, //format (0-59)
};

function isLate(time) {
  const checkInTime = dayjs(time).format("HH.mm");
  const lateTime = dayjs()
    .hour(workTime.hour)
    .minute(workTime.minute)
    .format("HH.mm");

  return checkInTime > lateTime;
}

module.exports = {
  isLate,
};
