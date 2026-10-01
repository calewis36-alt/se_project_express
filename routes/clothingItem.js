const router = require("express").Router();
const { getClothingItems, createClothingItem, updateClothingItem, deleteClothingItem } = require("../controllers/clothingItem");

// create a new clothing item
router.get("/", getClothingItems);

// read all clothing items
router.post("/", createClothingItem);

// update a clothing item
router.put("/:itemId", updateClothingItem);

// delete a clothing item
router.delete("/:itemId", deleteClothingItem);

module.exports = router;
