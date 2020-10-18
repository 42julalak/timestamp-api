const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const status = require("../enum/status.enum");
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    idNumber: String,
    birthDate: Date,
    address: String,
    workRole: {
      type: String,
      required: true,
    },
    systemRole: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: status.ACTIVE,
    },
  },
  { timestamps: true }
);

const authenSchema = new Schema(
  {
    tel: String,
    token: String,
  },
  { timestamps: true }
);

const otpSchema = new Schema(
  {
    otp: String,
    ref: String,
    expire: Date,
    status: String,
  },
  { timestamps: true }
);

const checkInSchema = new Schema(
  {
    tel: {
      type: String,
      required: true,
    },
    name: String,
    workRole: String,
    systemRole: String,
  },
  { timestamps: true }
);

const model = {
  user: mongoose.model("users", userSchema),
  authen: mongoose.model("authen", authenSchema),
  otp: mongoose.model("otp", otpSchema),
  checkIn: mongoose.model("checkIn", checkInSchema),
};

module.exports = model;
