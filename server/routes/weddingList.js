const express = require("express");
const router = express.Router();

const list = require("../controllers/memberlistController");
// router.get('/guests',getGuests);
router.get("/:id", list.WeddingGuests);

module.exports = router;
