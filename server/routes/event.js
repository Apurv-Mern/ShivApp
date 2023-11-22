// routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

router.get('/', getAllEvents);
router.post('/', createEvent);
router.get('/:id', getEventById);
router.put('/', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
