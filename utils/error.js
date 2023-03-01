// ApiError class is used to handle errors in the application. All errors are handled by the global error handler in app.js
class APIError extends Error {
  constructor (message, status) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.status = status
  }
}

class HTTP400Error extends APIError {
  constructor (message = 'Bad Request') {
    super(message, 400)
  }
}

class HTTP401Error extends APIError {
  constructor (message = 'Unauthorized') {
    super(message, 401)
  }
}

class HTTP403Error extends APIError {
  constructor (message = 'Forbidden') {
    super(message, 403)
  }
}

class HTTP404Error extends APIError {
  constructor (message = 'Not Found') {
    super(message, 404)
  }
}

class HTTP500Error extends APIError {
  constructor (message = 'Internal Server Error') {
    super(message, 500)
  }
}

module.exports = {
  APIError,
  HTTP400Error,
  HTTP401Error,
  HTTP403Error,
  HTTP404Error,
  HTTP500Error
}
