
const express = require('express');
const router = express.Router();

const {handleCoordinates,retrieveCoordinates}=require('../controllers/coordinateController')

router.post('/box-coordinates',handleCoordinates);
router.get('/retrieveCoordinates/:user_id/:event_id',retrieveCoordinates);

module.exports = router;