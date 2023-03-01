require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 8081,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/redis',
  REDIS_URI: process.env.REDIS_URI || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6379
}
