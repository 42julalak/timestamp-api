const axios = require('axios')
const tokenizer = require('../middleware/tokenizer')
const model = require('../models/db')
const statusEnum = require('../enum/status.enum') 

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
  },

  createUser (req, res) {
    const { tel, name, role } = req.body
    console.log(req.body)
    
    try {
      const created = new model.user({ 
        tel,
        name,
        role,
        status: statusEnum.ACTIVE
      }).save()

      res.json({
        success: true,
        data: created
      })
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`)
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500)
    }
  },

  async getUsers (req, res) {
    try {
      const users = await model.user.find({status: statusEnum.ACTIVE})

      res.json({
        success: true,
        data: users
      })
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`)
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500)
    }
  },

  async getUserByTel (req, res) {
    try {
      const { tel } = req.params
      const user = await model.user.findOne({ tel })

      res.json({
        success: true,
        data: user
      })
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`)
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500)
    }
  },

  async updateUserByTel (req, res) {
    try {
      const { tel } = req.params
      const { name, role } = req.body
      const updated = await model.user.findOneAndUpdate({ tel }, { name, role })

      res.json({
        success: true,
        data: updated
      })
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`)
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500)
    }
  },

  async deleteUserByTel (req, res) {
    try {
      const { tel } = req.params
      const deleted = await model.user.findOneAndUpdate({ tel }, { status: statusEnum.DELETED })

      res.json({
        success: true,
        data: deleted
      })
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`)
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500)
    }
  },

  async getAuth (req, res) {
    try {
      const { tel } = req.query
      const user = await model.user.findOne({tel})
      const token = tokenizer.createToken(user.tel, user.role)

      res.json({
        success: true,
        data: token
      })
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`)
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500)
    }
  }
}


//logic
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