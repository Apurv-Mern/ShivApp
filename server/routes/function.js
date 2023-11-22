// routes/userFunctionRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllUserFunctions,
    createUserFunction,
    getUserFunctionById,
    updateUserFunction,
    deleteUserFunction
} = require('../controllers/functionController');

router.get('/', getAllUserFunctions);
router.post('/', createUserFunction);
router.get('/:id', getUserFunctionById);
router.put('/:id', updateUserFunction);
router.delete('/:id', deleteUserFunction);

module.exports = router;
