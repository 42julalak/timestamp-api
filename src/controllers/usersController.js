const { Firestore, Auth } = require('../models/firebase')
const bcrypt = require('bcrypt')
require('dotenv').config()

const usersController = {
  async getUsers (req, res) {
    try {
      const snapshot = await firestore.collection('users').get()
      const users = []
      snapshot.forEach((doc) => {
        users.push(doc.data())
      })

      res.json(users)
    } catch (e) {
      console.error(`[GOT AN ERROR]: ${e.message}`)
      res.send(`[GOT AN ERROR]: ${e.message}`).status(500)
    }
  },

  //NOT-DONE
  async signIn (req, res) {
    const { email, password } = req.body
    await bcrypt.hash(password, process.env.SALT_ROUND, async (err, hash) => {
      try {
        const user = await Auth.signInWithEmailAndPassword(email, password)
        console.log(user)
        res.send("done")
      } catch (e) {
        console.error(`[GOT AN ERROR]: ${e.message}`)
        res.send(`[GOT AN ERROR]: ${e.message}`).status(500)
      }
    })
  },

  async createUser (req, res) {
    await bcrypt.hash(req.body.user.password, process.env.SALT_ROUND, (err, hash) => {
      console.log(hash)
      try {  
        Auth.createUser({
          email: req.body.user.email,
          emailVerified: false,
          phoneNumber: req.body.user.phone,
          password: hash,
          displayName: req.body.user.name,
          disabled: false
        })

        res.json({message:'User Created'})
      } catch(e){
        console.log(e)
        res.json({ message:'Error creating user' })
      }
    })
  }
}

module.exports = usersController