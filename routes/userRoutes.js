const express = require("express");
const {
  createUser,
  updateUser,
  getAllUsers,
  deleteUser,
  getUser,
} = require("../core/user.core");
const router = express.Router();

router.post("/create-user", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/user/update/:id", updateUser);
router.delete("/user/delete/:id", deleteUser);

module.exports = router;
