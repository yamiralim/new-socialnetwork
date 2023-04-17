const { Thought, User } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getThoughtById(req, res) {
    Thought.findById(req.params.id)
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with this ID" });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) =>
        User.findByIdAndUpdate(
          req.body.userID,
          { $push: { thoughts: thought._id } },
          { new: true }
        )
      )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought by ID" });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.id)
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with that ID" });
        } else {
          return User.findByIdAndUpdate(
            req.body.userID,
            { $pull: { thoughts: thought._id } },
            { new: true }
          );
        }
      })
      .then(() =>
        res.json({ message: "Thought and associated user updated!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought found with that ID" });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought found with that ID" });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
