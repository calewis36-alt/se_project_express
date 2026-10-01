const router = require("express").Router();
const { getClothingItems, createClothingItem, updateClothingItem, deleteClothingItem, likeItem, dislikeItem } = require("../controllers/clothingItem");

// read all clothing items
router.get("/", getClothingItems);

// create a new clothing item
router.post("/", createClothingItem);

// update a clothing item
router.put("/:itemId", updateClothingItem);

// delete a clothing item
router.delete("/:itemId", deleteClothingItem);

// like a clothing item
 router.put("/:itemId/likes", likeItem);

// dislike a clothing item
 router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
