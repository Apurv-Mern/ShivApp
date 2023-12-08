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
  getGroupInvitationTypesByUserId,
  insertOrUpdateGroupInvitationType,
  getGuestCeremonyByCode
} = require("../controllers/groupController");

router.get("/", getAllGroups);
router.post("/insertOrUpdateGroupInvitationType",insertOrUpdateGroupInvitationType);
router.post("/", validateGroup, createGroup);
router.get("/:id", getGroupById);
router.get("/getGroupInvitationTypesByUserId/:user_id", getGroupInvitationTypesByUserId);
router.put("/:id", validateGroup, updateGroup);
router.delete("/:id", deleteGroup);
router.get('/getGuestCeremonyByCode/:code',getGuestCeremonyByCode);

module.exports = router;
