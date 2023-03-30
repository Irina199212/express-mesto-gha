const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const patternurl = require('../helpers/helper');

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvater,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/', getUsers);
router.get('/:userId', celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string().hex().length(24).required(),
    }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string().pattern(new RegExp(patternurl)),
    }),
}), updateUserAvater);
module.exports = router;
