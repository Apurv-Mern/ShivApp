// routes/guest.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get(
  "/user_details",
  adminController.getUsersListForAdmin
);

router.delete(
  "/user_details/:user_id",
  adminController.deleteUser
);

module.exports = router;
