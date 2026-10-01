const clothingItem = require("../models/clothingItem");

const getClothingItems = (req, res) => {
  clothingItem
    .find({})
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;
  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Invalid clothing item data" });
      } else
        res.status(500).send({ message: "An error occurred on the server" });
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
    .then((updatedItem) => res.status(200).send(updatedItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Clothing item not found" });
      }
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Invalid clothing item data" });
      }
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(200).send({ message: "Clothing item deleted" }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Clothing item not found" });
      }
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};

module.exports = {
  createClothingItem,
  getClothingItems,
  updateClothingItem,
  deleteClothingItem,
};
