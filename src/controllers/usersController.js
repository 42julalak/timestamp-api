const { Firestore, Auth } = require('../models/firebase')
const bcrypt = require('bcrypt')
const axios = require('axios')

require('dotenv').config()

const usersController = {

  async getOtp (req, res) {
    const { tel } = req.body
    const {otp, reference} = createOtp(tel)

    try {
      res.send("message sent")
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`)
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500)
    }
  }
}

async function sendSms ({ to, text, from }) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'authorization': process.env.INFOBIP_AUTH
    }
  }

  return await axios.post(`${process.env.INFOBIP_API}/sms/2/text/single`, {to, text, from}, config)
}

function randomForm (length, type) {
  let result = ''
  const alphaNum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const digits = '0123456789'
  const format = type === 'digits' ? digits : alphaNum
  for (let i = 0; i < length; i++) {
    result += format.charAt(Math.floor(Math.random() * format.length))
  }

  return result
}

async function createOtp (tel) {
  const otp = randomForm(4, 'digits')
  const reference = randomForm(6, 'alphanum')

  sendSms({
    to: tel,
    text: `รหัส OTP ของคุณคือ "${otp}" รหัสอ้างอิง ${reference}`,
    from: 'timestamp-api'
  })

  return {
    otp,
    reference
  }
}

module.exports = usersController