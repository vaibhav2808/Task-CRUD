const User = require('../models/User')
const httpStatus = require('http-status')
/**
* This is a middleware function that will be used to authenticate the API key. It checks against the database to see if the API key exists. If it does, it will call next() to move on to the next middleware function. If it doesn't, it will return an error.```
*/
const authenticateApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key']
  console.log(apiKey)
  const user = await User.findOne({ apiKey })
  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }
  req.userId = user._id
  next()
}

module.exports = authenticateApiKey
