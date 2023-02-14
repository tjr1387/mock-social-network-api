const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  // updateUser
  // deleteUser (+ remove associated thoughts for bonus)
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);
  //.put(updateUser).delete(deleteUser)

module.exports = router;