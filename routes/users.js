const router = require('express').Router();

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvater,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvater);
module.exports = router;
