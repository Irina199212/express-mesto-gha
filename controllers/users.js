const User = require('../models/user');
const NotFoundError = require('../errors/notfound');
const { NOT_FOUND_STATUS, SERVER_DEFAULT_STATUS, INVALID_STATUS } = require('../errors/status');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(SERVER_DEFAULT_STATUS).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId).orFail(() => {
    throw new NotFoundError('Пользователь по указанному _id не найден');
  })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_STATUS).send({
          message: 'Пользователь по указанному _id не найден',
        });
        return;
      }

      if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_STATUS).send({
          message: 'Пользователь по указанному _id не найден',
        });
        return;
      }

      res.status(SERVER_DEFAULT_STATUS).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_STATUS).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
        return;
      }

      res.status(SERVER_DEFAULT_STATUS).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  ).orFail(() => {
    throw new NotFoundError('Пользователь по указанному _id не найден');
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_STATUS).send({
          message: 'Пользователь по указанному _id не найден',
        });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(INVALID_STATUS).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
        return;
      }

      if (err.name === 'CastError') {
        res.status(NOT_FOUND_STATUS).send({
          message: 'Пользователь с указаvнным _id не найден',
        });
        return;
      }

      res.status(SERVER_DEFAULT_STATUS).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateUserAvater = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  ).orFail(() => {
    throw new NotFoundError('Пользователь по указанному _id не найден');
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_STATUS).send({
          message: 'Пользователь по указанному _id не найден',
        });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(INVALID_STATUS).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
        return;
      }

      if (err.name === 'CastError') {
        res.status(NOT_FOUND_STATUS).send({
          message: 'Пользователь с указанным _id не найден',
        });
        return;
      }

      res.status(SERVER_DEFAULT_STATUS).send({ message: 'Ошибка по умолчанию' });
    });
};
