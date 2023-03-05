const Card = require('../models/card');

const NotFoundError = require('../errors/notfound');
const { NOT_FOUND_STATUS, SERVER_DEFAULT_STATUS, INVALID_STATUS } = require('../errors/status');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(SERVER_DEFAULT_STATUS).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INVALID_STATUS).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
        return;
      }
      res.status(SERVER_DEFAULT_STATUS).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).orFail(() => {
    throw new NotFoundError('Карточка с указанным _id не найдена');
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_STATUS).send({
          message: 'Карточка с указанным _id не найдена',
        });
        return;
      }
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_STATUS).send({
          message: 'Карточка с указанным _id не найдена',
        });
        return;
      }
      res.status(SERVER_DEFAULT_STATUS).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => {
    throw new NotFoundError('Карточка с указанным _id не найдена');
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_STATUS).send({
          message: 'Карточка с указанным _id не найдена',
        });
        return;
      }

      if (err.name === 'ValidationError') {
        res.status(INVALID_STATUS).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка',
        });
        return;
      }

      if (err.name === 'CastError') {
        res.status(NOT_FOUND_STATUS).send({
          message: 'Передан несуществующий _id карточки',
        });
        return;
      }

      res.status(SERVER_DEFAULT_STATUS).send({ message: 'Ошибка по умолчанию' });
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => {
    throw new NotFoundError('Карточка с указанным _id не найдена');
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(NOT_FOUND_STATUS).send({
          message: 'Карточка с указанным _id не найдена',
        });
        return;
      }

      if (err.name === 'ValidationError') {
        res.status(INVALID_STATUS).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка',
        });
        return;
      }

      if (err.name === 'CastError') {
        res.status(NOT_FOUND_STATUS).send({
          message: 'Передан несуществующий _id карточки',
        });
        return;
      }

      res.status(SERVER_DEFAULT_STATUS).send({ message: 'Ошибка по умолчанию' });
    });
};
