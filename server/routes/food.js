const express = require('express');
const router = express.Router();
const foodsController = require('../controllers/foodsController');

router.get('/', foodsController.getAllFoods);
router.post('/', foodsController.createFood);
router.get('/:id', foodsController.getFoodById);
router.post('/user/:user_id', foodsController.uploadSelectedfoods);
router.get('/user/:user_id', foodsController.getselectedfoods);
router.get('/:user_id', foodsController.getFoodByUserId);
router.put('/:id', foodsController.updateFood);
router.delete('/:id', foodsController.deleteFood);

module.exports = router;
