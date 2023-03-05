const ApplicationError = require('./application');
const { NOT_FOUND_STATUS } = require('./status');

module.exports = class NotFoundError extends ApplicationError {
  constructor(message) {
    super(NOT_FOUND_STATUS, message);
  }
};
