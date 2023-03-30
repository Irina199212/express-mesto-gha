const { SERVER_DEFAULT_STATUS } = require('../errors/status');

const errors = (err, req, res, next) => {
  const statusCode = err.status || SERVER_DEFAULT_STATUS;

  const message = statusCode === SERVER_DEFAULT_STATUS ? '' : err.message;

  res.status(statusCode).send({ message });

  // if (err.code === 11000) {
  //   res.status(REGISTER_STATUS).send({
  //     message: 'Пользователь с указанным email уже существует',
  //   });
  //   return;
  // }

  // if (err.name === 'TokenError') {
  //   res.status(TOKEN_STATUS).send({
  //     message: 'Необходима авторизация',
  //   });
  //   return;
  // }

  // if (err.name === 'AccessError') {
  //   res.status(ACCESS_STATUS).send({
  //     message: 'Доступ запрещен',
  //   });
  //   return;
  // }

  // if (err.name === 'ValidationError') {
  //   res.status(INVALID_STATUS).send({
  //     message: 'Переданы некорректные данные',
  //   });
  //   return;
  // }

  // if (err.name === 'NotFoundError') {
  //   res.status(NOT_FOUND_STATUS).send({
  //     message: err.message,
  //   });
  //   return;
  // }
  // if (err.name === 'CastError') {
  //   res.status(NOT_FOUND_STATUS).send({
  //     message: 'По указанному _id ничего не найдено',
  //   });
  //   return;
  // }
  // res.status(SERVER_DEFAULT_STATUS).send({
  //   message: 'На сервере произошла ошибка',
  // });
};

module.exports = errors;
