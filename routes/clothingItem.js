const auth = require("../middlewares/auth");
const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  updateClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// read all clothing items
router.get("/", getClothingItems);

// create a new clothing item
router.post("/", auth, createClothingItem);

// update a clothing item
router.put("/:itemId", auth, updateClothingItem);

// delete a clothing item
router.delete("/:itemId", auth, deleteClothingItem);

// like a clothing item
router.put("/:itemId/likes", auth, likeItem);

// dislike a clothing item
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
