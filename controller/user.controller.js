const httpStatus = require('http-status')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { HTTP404Error, HTTP401Error, HTTP400Error } = require('../utils/error')

const generateAPIKey = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new HTTP400Error('User already exists')
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const apiKey = generateAPIKey()
  await User.create({ email, password: hashedPassword, apiKey })
  res.status(httpStatus.CREATED).json({ apiKey })
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw new HTTP404Error('User not found')
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new HTTP401Error('Invalid password')
  }
  res.status(httpStatus.OK).json({ apiKey: user.apiKey })
}

module.exports = {
  register,
  login
}
