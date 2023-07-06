const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config({ path: "./config/.env" });

function auth(req, res, next) {
  const token = req.header('x-auth-token')

  // check for token
  if (!token) {
    res.status(401).json({ msg: " no token, authoirzation denied" })
  }
  try {
    //verify token
    const decoded = jwt.verify(token, process.env.jwtSecret)
    // Add user from payload
    req.user = decoded
    next();

  } catch (e) {
    res.status(400).json({ msg: ' Token is not valid' })
  }
}

module.exports = auth;