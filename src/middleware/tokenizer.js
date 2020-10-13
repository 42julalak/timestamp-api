const jwt = require('jsonwebtoken')
const RoleEnum = require("../enum/role.enum")

require('dotenv').config()
const SECRET = process.env.JWT_SECRET

const role_authorize = [
	RoleEnum.ADMIN,
	RoleEnum.EMPLOYEE,
	RoleEnum.BOSS
]

function checkToken (req, res, next) {
	const token = req.headers['authorization'].split(' ')[1]
	const decoded = jwt.decode(token, SECRET)

	if(token && decoded.exp <= Date.now() / 1000) {
		return res.json({
			code: 401,
			message: 'token expired'
		})
	}

	if (token && role_authorize.some((role) => role === decoded.role)) {
    return res.json({
			code: 401,
			message: 'role unauthorized'
		})
	}
	
	next()
}

function adminAuthorizing (req, res, next) {
	const token = req.headers['authorization'].split(' ')[1]
	const decoded = jwt.decode(token, SECRET)

	if(token && decoded.exp <= Date.now() / 1000) {
		return res.json({
			code: 401,
			message: 'token expired'
		})
	}

	if (token && decoded.role !== RoleEnum.ADMIN) {
    return res.json({
			code: 401,
			message: 'role unauthorized'
		})
	}
	
	next()
}

function createToken (name, role) {
	return jwt.sign({ name, role }, SECRET, { expiresIn: '1h' })
}

module.exports = {
	adminAuthorizing,
  checkToken,
  createToken
}
