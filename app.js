const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')

app.use(express.json())

// CORS
app.use(cors())

// Routes
app.use('/api', routes)
// // add default route
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Not Found' })
// })

// Error handling
app.use(errorHandler)

module.exports = app
