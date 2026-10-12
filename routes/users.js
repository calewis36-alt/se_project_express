const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  updateUser,
  getCurrentUser,
} = require("../controllers/users");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);

module.exports = router;
