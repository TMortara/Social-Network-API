const { User, Thought } = require("../models");

module.exports = {
  // GET all Users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // GET single User by its _id & populate thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        // .populate('thoughts')
     

    //   .populate({ path: "thought", select: "-__v" })
    //   .populate({ path: "user", select: "friends" })
      .then((user) =>
        !user
          ? res.status(400).json({ message: "User not found with that Id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // CREATE a new User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // UPDATE a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found with that Id" })
          : res.json(user)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // DELETE a User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found with that Id" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and associated Thoughts have been deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // ADD a Friend to User's Friends list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found with that Id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // DELETE Friend from User's Friends list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found with that Id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
