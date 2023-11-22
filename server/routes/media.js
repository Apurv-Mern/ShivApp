const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage(); // Use memory storage to handle file buffers
const upload = multer({ storage });


const {uploadMedia,retriveMedia,uploadMutipleTemplates}= require('../controllers/mediaController');

router.post('/upload/user/:user_id/event/:event_id',upload.single('file'),uploadMedia);
router.get('/retrive/user/:user_id/event/:event_id',retriveMedia);
router.post('/upload-template/user/:user_id/event/:event_id', upload.array('images', 5),uploadMutipleTemplates)

module.exports=router;