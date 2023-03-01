const express = require('express')
const { userController } = require('../controller')
const catchAsync = require('../utils/catchAsync')
const router = express.Router()

router.post('/register', catchAsync(userController.register))
router.post('/login', catchAsync(userController.login))

module.exports = router
