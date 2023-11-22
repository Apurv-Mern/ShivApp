const express = require('express');
const router = express.Router();
const facebookController = require('../controllers/facebookController');

router.get('/auth/facebook', facebookController.authenticate);
router.get('/auth/facebook/callback', facebookController.authenticateCallback);

module.exports = router;