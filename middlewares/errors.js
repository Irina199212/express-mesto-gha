const { SERVER_DEFAULT_STATUS } = require('../errors/status');

const errors = (err, req, res, next) => {
  const statusCode = err.status || SERVER_DEFAULT_STATUS;

  const message = statusCode === SERVER_DEFAULT_STATUS ? 'Ошибка по умолчанию' : err.message;

  res.status(statusCode).send({ message });
  next();
};

module.exports = errors;
