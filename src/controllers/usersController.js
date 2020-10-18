const tokenizer = require("../middleware/tokenizer");
const model = require("../models/db");
const statusEnum = require("../enum/status.enum");
const otpModule = require("../function/otp");

require("dotenv").config();

const usersController = {
  async getOtp(req, res) {
    try {
      const { tel } = req.params;
      const user = await model.user.findOne({ tel });
      if (!!user) {
        const { otp, ref } = await otpModule.createOtp(tel);

        res.json({
          success: true,
          data: {
            ref,
          },
        });
      } else {
        res.json({
          success: false,
          message: "tel did not registered",
        });
      }
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`);
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500);
    }
  },

  async createUser(req, res) {
    try {
      const { form } = req.body;
      const created = await new model.user(form).save();

      res.json({
        success: true,
        data: created,
      });
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`);
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500);
    }
  },

  async getUsers(req, res) {
    try {
      const users = await model.user.find({ status: statusEnum.ACTIVE });

      res.json({
        success: true,
        data: users,
      });
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`);
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500);
    }
  },

  async getUserByTel(req, res) {
    try {
      const { tel } = req.params;
      const user = await model.user.findOne({ tel });

      res.json({
        success: true,
        data: user,
      });
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`);
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500);
    }
  },

  async updateUserByTel(req, res) {
    try {
      const { tel } = req.params;
      const { form } = req.body;
      const updated = await model.user.findOneAndUpdate({ tel }, form);

      res.json({
        success: true,
        data: updated,
      });
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`);
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500);
    }
  },

  async deleteUserByTel(req, res) {
    try {
      const { tel } = req.params;
      const deleted = await model.user.findOneAndUpdate(
        { tel },
        { status: statusEnum.DELETED }
      );

      res.json({
        success: true,
        data: deleted,
      });
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`);
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500);
    }
  },

  async getAuth(req, res) {
    try {
      const { tel, otp, ref } = req.query;
      const { success, message } = await otpModule.checkOtp(otp, ref);

      if (success) {
        const user = await model.user.findOne({ tel });
        const token = tokenizer.createToken(user.tel, user.systemRole);

        res.json({
          success: true,
          data: token,
        });
      } else {
        res.json({
          success: false,
          message,
        });
      }
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`);
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500);
    }
  },
};

module.exports = usersController;
