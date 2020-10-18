const model = require("../models/db");
const dayjs = require("dayjs");
const tasksModule = require("../function/task");

require("dotenv").config();

const tasksController = {
  async checkIn(req, res) {
    try {
      const { tel } = req.body;
      const { name, workRole, systemRole } = await model.user.findOne({ tel });
      const isLate = tasksModule.isLate(dayjs().format());

      const created = await new model.checkIn({
        tel,
        name,
        workRole,
        systemRole,
        isLate,
      }).save();

      res.json({
        success: true,
        data: {
          created,
          isLate,
        },
      });
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`);
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500);
    }
  },

  async getCheckInHistory(req, res) {
    try {
      const checkInList = await model.checkIn.find();

      res.json({
        success: true,
        data: checkInList,
      });
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`);
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500);
    }
  },
};

module.exports = tasksController;
