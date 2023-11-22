const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/pdfcontroller');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 10 * 1024 * 1024, // Example: 10MB limit for field size
    },
  });

router.post('/upload-images/users/:user_id/event/:event_id', upload.array('images', 3), imageController.uploadImages);
router.post('/upload-image/users/:user_id/event/:event_id', upload.array('images', 1), imageController.uploadImage);
router.post('/savethedate/users/:user_id/', upload.array('images', 1), imageController.savethedate);
router.post('/saveTheDateTestMail', upload.array('images', 1), imageController.saveTheDateTestMail);
router.post('/uploadImagesTestMail', upload.array('images', 3), imageController.uploadImagesTestMail);
router.post('/uploadImageTestMail', upload.array('images', 1), imageController.uploadImageTestMail);


module.exports = router;