// routes/eventRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllEventsceremonyByUserId,
    createCeremony,
    createCeremonyGroups,
    addEventForCeremony,
    getEventceremonyById,
    updateEventceremony,
    updateEventceremonyName,
    getCeremonyGroupsByUserId,
    deleteEventceremony,
    getAllEventsceremonyByUserIdOrderByDate
} = require('../controllers/ceremonyController');

router.get('/user/:user_id',   getAllEventsceremonyByUserId);
router.get('/userbydate/:user_id', getAllEventsceremonyByUserIdOrderByDate);
router.post('/', createCeremony);

//to update all ceremony with event_id for a user
router.post('/user/:user_id/event/:event_id',addEventForCeremony);

//to update individual ceremony with event_id for a user
//router.post('/user/:user_id/event/:event_id/ceremony/:ceremony_id',addEventForCeremony);

router.post('/groups/:user_id', createCeremonyGroups);
router.get('/:id', getEventceremonyById);
router.get('/usergroup/:user_id', getCeremonyGroupsByUserId);
router.put('/user/:user_id', updateEventceremony);
router.put('/user/:user_id/event/:event_id', updateEventceremonyName);
router.delete('/:id', deleteEventceremony);

module.exports = router;
