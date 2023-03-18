const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT, DB } = require('./config');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const {
  REGISTER_STATUS,
  SERVER_DEFAULT_STATUS,
  INVALID_STATUS,
  NOT_FOUND_STATUS,
  ACCESS_STATUS,
  TOKEN_STATUS,
} = require('./errors/status');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', false);
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((err, req, res, next) => {
  if (err.code === 11000) {
    res.status(REGISTER_STATUS).send({
      message: 'Пользователь с указанным email уже существует',
    });
    return;
  }

  if (err.name === 'TokenError') {
    res.status(TOKEN_STATUS).send({
      message: 'Необходима авторизация',
    });
    return;
  }

  if (err.name === 'AccessError') {
    res.status(ACCESS_STATUS).send({
      message: 'Доступ запрещен',
    });
    return;
  }

  if (err.name === 'ValidationError') {
    res.status(INVALID_STATUS).send({
      message: 'Переданы некорректные данные',
    });
    return;
  }

  if (err.name === 'NotFoundError') {
    res.status(NOT_FOUND_STATUS).send({
      message: err.message,
    });
    return;
  }
  if (err.name === 'CastError') {
    res.status(NOT_FOUND_STATUS).send({
      message: 'По указанному _id ничего не найдено',
    });
    return;
  }
  res.status(SERVER_DEFAULT_STATUS).send({
    message: 'На сервере произошла ошибка',
  });
  next();
});

app.listen(PORT, () => {});
