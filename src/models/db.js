const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('dotenv').config()

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true});

const userSchema = new Schema({
  name: String,
  tel: String,
  role: String,
  status: String
}, { timestamps: true })

const authenSchema = new Schema({
  tel: String,
  token: String
}, { timestamps: true })

const model = {
  user: mongoose.model('users', userSchema),
  authen: mongoose.model('authen', authenSchema)
}

module.exports = model
