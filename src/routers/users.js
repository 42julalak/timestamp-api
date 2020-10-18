const express =  require('express')
const usersController = require('../controllers/usersController')
const router = express.Router()
const tokenizer  = require('../middleware/tokenizer')

router.get('/get-otp', usersController.getOtp)
router.get('/get-auth', usersController.getAuth)

//CRUD
router.get('/', tokenizer.adminAuthorizing, usersController.getUsers)
router.get('/:tel', tokenizer.adminAuthorizing, usersController.getUserByTel)
router.post('/', tokenizer.adminAuthorizing, usersController.createUser)
router.put('/:tel', tokenizer.adminAuthorizing, usersController.updateUserByTel)
router.delete('/:tel', tokenizer.adminAuthorizing, usersController.deleteUserByTel)

module.exports = router