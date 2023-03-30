const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const patternurl = require('../helpers/helper');

const {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      link: Joi.string().pattern(new RegExp(patternurl)),
    })
    .unknown(true),
}), createCard);
router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);
module.exports = router;
