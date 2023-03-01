const httpStatus = require('http-status')
const Task = require('../models/Task')
const { HTTP404Error } = require('../utils/error')

const create = async (req, res) => {
  const { name, description, assignee, expireOn, completed } = req.body
  const task = await Task.create({ name, description, assignee, expireOn, completed, userId: req.userId })
  res.status(httpStatus.CREATED).json({ task })
}

const readAll = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId }).cache({ key: req.userId })
  res.status(httpStatus.OK).json({ tasks })
}

const readOne = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.userId })
  if (!task) {
    throw new HTTP404Error('Task not found')
  }
  res.status(httpStatus.OK).json({ task })
}

const update = async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true })
  if (!task) {
    throw new HTTP404Error('Task not found')
  }
  res.status(httpStatus.OK).json({ task })
}

const remove = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId })
  if (!task) {
    throw new HTTP404Error('Task not found')
  }
  res.status(httpStatus.OK).json({ task })
}

module.exports = {
  create,
  readAll,
  readOne,
  update,
  remove
}
