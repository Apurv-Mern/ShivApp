const express = require('express');
const router = express.Router();
const drinksController = require('../controllers/drinksController');

router.get('/', drinksController.getAlldrinks);
router.post('/', drinksController.createdrink);
router.get('/:id', drinksController.getdrinkById);
router.post('/user/:user_id', drinksController.uploadSelectedDrinks);
router.get('/user/:user_id', drinksController.getselecteddrinks);
router.get('/:user_id', drinksController.getdrinkByUserId);
router.put('/:id', drinksController.updatedrink);
router.delete('/:id', drinksController.deletedrink);

module.exports = router;
