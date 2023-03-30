const ApplicationError = require('./application');
const { INVALID_STATUS } = require('./status');

module.exports = class ValidationError extends ApplicationError {
  constructor(message) {
    super(INVALID_STATUS, message);
  }
};
