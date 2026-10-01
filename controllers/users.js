const User = require("../models/user");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};

const createUser = (req, res) => {
  // POST /users
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Invalid user data" });
      } else
        res.status(500).send({ message: "An error occurred on the server" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid user ID" });
      }
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};

module.exports = { getUsers, createUser, getUser };
