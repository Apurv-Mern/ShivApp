// routes/guest.js
const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');
const { importGuests, upload } = require("../controllers/guestController");

router.get('/', guestController.getAllGuests);
router.get("/getallguest/:id",guestController.getAllGuestsForUser);
router.get("/users/:user_id/group/:groupname",guestController.getGuestsByGroup);
router.post("/:id",  guestController.createGuest);
router.get("/:id", guestController.validateGuest, guestController.getGuestById);
router.put("/:guestId", guestController.validateGuest, guestController.updateGuest);
router.delete(
  "/:id",
  guestController.validateGuest,
  guestController.deleteGuest
);
router.post("/import/:user_id", upload.single("file"), importGuests);

module.exports = router;
