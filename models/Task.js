const mongoose = require('mongoose')
const Schema = mongoose.Schema

// name, description, assignee, createdAt,expireOn, completed: boolean
const TaskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  assignee: { type: String, required: true },
  expireOn: { type: Date, required: true },
  completed: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task
