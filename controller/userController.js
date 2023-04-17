const { User, Thought } = require("../models");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createUser: async (req, res) => {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user" });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });
      if (!user) {
        res.status(404).json({ message: "No user with that ID" });
      } else {
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: "User and associated apps deleted!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        res.status(404).json({ message: "No user with that ID" });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No friend found with that ID :(" });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No friend found with that ID :(" });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
