const ApplicationError = require('./application');
const { ACCESS_STATUS } = require('./status');

module.exports = class AccessError extends ApplicationError {
  constructor(message) {
    super(ACCESS_STATUS, message);
  }
};
