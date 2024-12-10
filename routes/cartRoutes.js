const express = require('express');
const addEntry = require('../controllers/addEntry');
const getEntryById = require('../controllers/getEntryById');
const updateEntry = require('../controllers/updateEntry');
const deleteEntry = require('../controllers/deleteEntry');
const authMiddleware = require('../middleware/authmiddleware.js');



const router = express.Router();

router.post('/addProduct', authMiddleware, addEntry);
router.get('/getById/:id', authMiddleware ,getEntryById); 
router.patch('/patch/:id', authMiddleware , updateEntry);
router.delete('/removeProduct/:id', authMiddleware, deleteEntry);

module.exports = router;