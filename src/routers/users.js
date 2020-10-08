const express =  require('express')
const usersController = require('../controllers/usersController')
const router = express.Router()

router.post('/get-otp', usersController.getOtp)

module.exports = router;  