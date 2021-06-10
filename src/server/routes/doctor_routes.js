const express = require('express');

const router = express.Router();
const doctorController = require('../controller/user_helper.js');

// Retrieve all doctor
router.get('/', doctorController.findAll);

// Create a new doctor
router.post('/', doctorController.create);

// Retrieve a single doctor with id
router.get('/:id', doctorController.findById);

// Update a doctor with id
router.put('/:id', doctorController.update);

// Delete a doctor with id
router.delete('/:id', doctorController.delete);

module.exports = router;
