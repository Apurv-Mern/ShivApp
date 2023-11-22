const express = require("express");
const profileController = require("../controllers/profileController");

const router = express.Router();

// Profile Photo Upload Route
router.use(profileController)

module.exports = router;
