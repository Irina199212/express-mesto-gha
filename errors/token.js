const ApplicationError = require('./application');
const { TOKEN_STATUS } = require('./status');

module.exports = class TokenError extends ApplicationError {
  constructor(message) {
    super(TOKEN_STATUS, message);
  }
};
