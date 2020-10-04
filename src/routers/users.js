const express =  require('express')
const usersController = require('../controllers/usersController')
const router = express.Router()

router.get('/', usersController.getUsers)
router.post('/', usersController.createUser)
router.post('/sign-in', usersController.signIn)

module.exports = router;  