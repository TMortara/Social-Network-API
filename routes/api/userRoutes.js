const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// const { create } = require('../../models/User');

router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
  .route("/:usersId/friends/:friendsId")
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
