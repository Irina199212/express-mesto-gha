const { SERVER_DEFAULT_STATUS } = require('./status');

module.exports = class ApplicationError extends Error {
  constructor(status = SERVER_DEFAULT_STATUS, message = 'Ошибка по умолчанию') {
    super();
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
