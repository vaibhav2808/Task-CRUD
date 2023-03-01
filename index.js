const mongoose = require('mongoose')
const { MONGO_URI, PORT } = require('./config/config')
const app = require('./app')

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('MongoDB connected')
  app.listen(PORT, () => {
    console.log('Server started')
  })
}).catch(err => {
  console.log(err)
})
