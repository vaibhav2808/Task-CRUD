const mongoose = require('mongoose')
const redis = require('redis')
const { REDIS_URI, REDIS_PORT, REDIS_PASSWORD } = require('../config/config')

const client = redis.createClient({
  socket: {
    host: REDIS_URI,
    port: REDIS_PORT
  },
  password: REDIS_PASSWORD,
  disableOfflineQueue: true
})
// client.hmGet = util.promisify(client.hmGet)
client.connect().then(() => console.log('Redis connected')).catch(err => console.log(err))

const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function (options = {}) {
  this.enableCache = true
  this.hashKey = JSON.stringify(options.key || 'default')

  return this
}

mongoose.Query.prototype.exec = async function () {
  if (!this.enableCache) {
    return exec.apply(this, arguments)
  }
  const key = JSON.stringify(Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name
  }))
  try {
    const cachedValue = await client.hmGet(this.hashKey, key)
    if (cachedValue) {
      const parsedCache = JSON.parse(cachedValue)
      console.log('Used cache')
      return Array.isArray(parsedCache)
        ? parsedCache.map(doc => new this.model(doc))
        : new this.model(parsedCache)
    }
  } catch (err) {
    console.log(err)
  }

  const result = await exec.apply(this, arguments)
  console.log('Used database')

  client.hSet(this.hashKey, key, JSON.stringify(result), 'EX', 300).catch(err => console.log(err))

  return result
}

const clearUserCache = (req, res, next) => {
  client.del(JSON.stringify(req.userId)).catch(err => console.log(err))
  next()
}

module.exports = {
  clearUserCache
}
