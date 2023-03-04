const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  updateUserAvater,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);

router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvater);
module.exports = router;
