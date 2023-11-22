// routes/groupRoutes.js
const express = require("express");
const router = express.Router();
const {
  validateGroup,
  getAllGroups,
  createGroup,
  getGroupById,
  updateGroup,
  deleteGroup,
} = require("../controllers/groupController");

router.get("/", getAllGroups);
router.post("/", validateGroup, createGroup);
router.get("/:id", getGroupById);
router.put("/:id", validateGroup, updateGroup);
router.delete("/:id", deleteGroup);

module.exports = router;
