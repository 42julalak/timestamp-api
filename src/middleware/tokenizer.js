const jwt = require("jsonwebtoken");
const SystemRoleEnum = require("../enum/systemRole.enum");

require("dotenv").config();
const SECRET = process.env.JWT_SECRET;

const role_authorize = [
  SystemRoleEnum.ADMIN,
  SystemRoleEnum.EMPLOYEE,
  SystemRoleEnum.BOSS,
];

function checkToken(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  const decoded = jwt.decode(token, SECRET);

  if (token && decoded.exp <= Date.now() / 1000) {
    return res.json({
      code: 401,
      message: "token expired",
    });
  }

  if (token && !role_authorize.some((role) => role === decoded.role)) {
    return res.json({
      code: 401,
      message: "role unauthorized",
    });
  }

  next();
}

function adminAuthorizing(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  const decoded = jwt.decode(token, SECRET);

  if (token && decoded.exp <= Date.now() / 1000) {
    return res.json({
      code: 401,
      message: "token expired",
    });
  }

  if (token && decoded.role !== SystemRoleEnum.ADMIN) {
    return res.json({
      code: 401,
      message: "role unauthorized",
    });
  }

  next();
}

function createToken(name, role) {
  return jwt.sign({ name, role }, SECRET, { expiresIn: "10h" });
}

module.exports = {
  adminAuthorizing,
  checkToken,
  createToken,
};
