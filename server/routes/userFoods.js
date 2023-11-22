const express = require("express");
const {
  createUserFood,
  getAllUserFoods,
  getUserFoodById,
  updateUserFood,
  deleteUserFood,
} = require("../controllers/userFoodsController");

const router = express.Router();

router.post("/", createUserFood);
router.get("/", getAllUserFoods);
router.get("/:id", getUserFoodById);
router.put("/", updateUserFood);
router.delete("/:id", deleteUserFood);

module.exports = router;
