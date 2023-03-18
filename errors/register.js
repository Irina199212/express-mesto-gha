const ApplicationError = require('./application');
const { REGISTER_STATUS } = require('./status');

module.exports = class RegisterError extends ApplicationError {
  constructor(message) {
    super(REGISTER_STATUS, message);
  }
};
