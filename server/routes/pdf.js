const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/pdfcontroller');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 10 * 1024 * 1024, //  10MB limit for field size
    },
  });

router.post('/WeddingTestMail/users/:user_id/event/:event_id', upload.array('images', 3), imageController.Wedding);
router.post('/WeAreEngaged/users/:user_id/event/:event_id', upload.array('images', 1), imageController.WeAreEngaged);
router.post('/thankyou/users/:user_id/event/:event_id', upload.array('images', 1), imageController.thankyou);
router.post('/savethedate/users/:user_id/event/:event_id', upload.array('images', 1), imageController.savethedate);
router.post('/saveTheDateTestMail', upload.array('images', 1), imageController.saveTheDateTestMail);
router.post('/WeAreEngagedTestMail', upload.array('images', 3), imageController.WeAreEngagedTestMail);
router.post('/WeddingTestMail', upload.array('images', 3), imageController.WeddingTestMail);
router.post('/thankyouTestMail', upload.array('images', 1), imageController.thankyouTestMail);


module.exports = router;