const express = require("express");
const router = express.Router();

const rsvp =require('../controllers/RSVPInvitaionController');
// router.get('/guests',getGuests);
router.post('/responses',rsvp.handleResponse);
router.get('/questions',rsvp.RSVPQuestion);
router.post('/additionalguest',rsvp.handleAdditionalGuest);
router.get('/responses/:user_id',rsvp.handleGuestResponse);
module.exports = router;
