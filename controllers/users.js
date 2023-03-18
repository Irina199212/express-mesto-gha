const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const NotFoundError = require('../errors/notfound');
const AccessError = require('../errors/access');

module.exports.createUser = (req, res, next) => {
  const name = req.body.name ? req.body.name : 'Жак-Ив Кусто';
  const about = req.body.about ? req.body.about : 'Исследователь';
  const avatar = req.body.avatar
    ? req.body.avatar
    : 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';
  const { email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create(
      {
        name,
        about,
        avatar,
        email,
        password: hash,
      },
    ))
    .then((user) => {
      res.send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
          __v: user.__v,
        },
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        return user;
      });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ jwt: token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    })
    .then((user) => {
      if (user._id.toString() !== req.user._id) {
        throw new AccessError('Доступ запрещен');
      }

      User.findByIdAndUpdate(
        req.user._id,
        { name, about },
        {
          new: true,
          runValidators: true,
          upsert: false,
        },
      )
        .orFail(() => {
          throw new NotFoundError('Пользователь по указанному _id не найден');
        })
        .then((userData) => res.send({ data: userData }))
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUserAvater = (req, res, next) => {
  const { avatar } = req.body;

  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    })
    .then((user) => {
      if (user._id.toString() !== req.user._id) {
        throw new AccessError('Доступ запрещен');
      }

      return User.findByIdAndUpdate(
        req.user._id,
        { avatar },
        {
          new: true,
          runValidators: true,
          upsert: false,
        },
      )
        .orFail(() => {
          throw new NotFoundError('Пользователь по указанному _id не найден');
        })
        .then((userData) => res.send({ data: userData }))
        .catch((err) => {
          next(err);
        });
    }).catch((err) => {
      next(err);
    });
};
