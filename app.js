const path = require('path');
const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const NotFoundError = require('./errors/notfound');
const { PORT, DB } = require('./config');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorsContainer = require('./middlewares/errors');

const patternurl = require('./helpers/helper');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', false);
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        email: Joi.string().required().email(),
        avatar: Joi.string().pattern(new RegExp(patternurl)),
        password: Joi.string().required(),
      })
      .unknown(true),
  }),
  createUser,
);
app.post('/signin', celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
}), login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errors());
app.use(errorsContainer);

app.listen(PORT, () => {});
