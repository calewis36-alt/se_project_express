const clothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  CREATED,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const getClothingItems = (req, res) => {
  clothingItem
    .find({})
    .then((clothingItems) => res.send(clothingItems))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(CREATED).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid clothing item data" });
      } else
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
    });
};

const updateClothingItem = (req, res) => {
  const { itemId } = req.params;
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .findByIdAndUpdate(
      itemId,
      { name, weather, imageUrl },
      { new: true, runValidators: true }
    )
    .orFail()
    .then((updatedItem) => res.send(updatedItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid clothing item data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.send({ message: "Clothing item deleted" }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((updatedItem) => res.send(updatedItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((updatedItem) => res.send(updatedItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

module.exports = {
  createClothingItem,
  getClothingItems,
  updateClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
