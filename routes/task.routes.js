const express = require('express')
const { taskController } = require('../controller')
const catchAsync = require('../utils/catchAsync')
const authenticateApiKey = require('../middleware/apiAuth')
const { clearUserCache } = require('../utils/cache')
const router = express.Router()

// create
router.post('/', authenticateApiKey, clearUserCache, catchAsync(taskController.create))

// read
router.get('/', authenticateApiKey, catchAsync(taskController.readAll))

// update
router.put('/:id', authenticateApiKey, clearUserCache, catchAsync(taskController.update))

// delete
router.delete('/:id', authenticateApiKey, clearUserCache, catchAsync(taskController.remove))

// read one
router.get('/:id', authenticateApiKey, catchAsync(taskController.readOne))

module.exports = router
