const auth = require("../middlewares/auth");
const router = require("express").Router();
const {
  getUsers,
  updateUser,
  getUser,
  getCurrentUser,
} = require("../controllers/users");

router.get("/", auth, getUsers);
router.get("/me", auth, getCurrentUser);
router.get("/:userId", auth, getUser);
router.patch("/me", auth, updateUser);

module.exports = router;
