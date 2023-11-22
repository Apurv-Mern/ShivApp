// routes/guest.js
const express = require("express");
const router = express.Router();
const cronController = require("../controllers/emailCronJob");

router.post("/", cronController.setcronjob);

module.exports = router;
