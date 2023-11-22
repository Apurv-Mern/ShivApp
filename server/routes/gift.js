const express = require('express');
const router = express.Router();
const userGiftsController = require('../controllers/giftController');

router.post('/', userGiftsController.createUserGift);
router.get('/:user_id', userGiftsController.getUserGifts);
router.get('/list/:id/:cid', userGiftsController.getAllUSerGifts);
router.put('/', userGiftsController.updateUserGift);
router.delete('/:id', userGiftsController.deleteUserGift);
router.get('/helloo', (res,req)=>{
    res.send("hello");
});

module.exports = router;
