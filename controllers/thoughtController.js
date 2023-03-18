const { User, Thought } = require("../models");

module.exports = {
  // GET all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // GET single thought by _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that Id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // CREATE new Thought and ADD to Users Thoughts Array
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({
                message: "Thought created, but User not found with that Id",
              })
          : res.json("Thought successfully created!"),
      )
      .catch((err) => res.status(500).json(err));
  },
  // UPDATE Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that Id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // DELETE Thought by Id and DELETE from User's thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.stuats(404).json({ message: "No thought found with that Id" })
          : User.findOneAndUpdate(
              { userId: req.body.userId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({
                message:
                  "Thought deleted successfully but user not found with that Id",
              })
          : res.json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // CREATE reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoguht with that Id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // DELETE reaction and DELETE from Reactions Array
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No reaction found with that Id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
