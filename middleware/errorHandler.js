const { APIError } = require('../utils/error')
const httpStatus = require('http-status')

const errorConverter = (err, req, res, next) => {
  let error = err
  if (!(error instanceof APIError)) {
    const statusCode = error.statusCode || error.status || httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]
    error = new APIError(
      message,
      statusCode
    )
  }
  return error
}

const errorHandler = (err, req, res, next) => {
  const error = errorConverter(err, req, res, next)
  console.error(error)
  const { status, message } = error
  res.status(status).json({
    status,
    message
  })
}

module.exports = errorHandler
