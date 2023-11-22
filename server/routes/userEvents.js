const express = require("express");
const { check} = require('express-validator');
const {
  createUserEvent,
  getAllUserEvents,
  getUserEventsAndCeremonies,
  updateUserEvent,
  deleteUserEvent,
  getUserEventData,
} = require("../controllers/userEventsController");

const router = express.Router();

router.post("/", createUserEvent);
router.get("/", getAllUserEvents);
router.get("/:id", getUserEventsAndCeremonies);
router.put("/",check('user_id').isInt().withMessage('user_id must be an integer'), updateUserEvent);
router.delete("/:id", deleteUserEvent);
router.get("/userEventData/:id", getUserEventData);
module.exports = router;
