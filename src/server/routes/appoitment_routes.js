const express = require('express');

const router = express.Router();
const appoitmentController = require('../controller/appoitment_helper.js');

// Retrieve all appoitment
router.get('/', appoitmentController.findAll);

// Create a new appoitment
router.post('/', appoitmentController.create);

// Retrieve a single appoitment with id
router.get('/:id', appoitmentController.findById);

// Update a appoitment with id
router.put('/:id', appoitmentController.update);

// Delete a appoitment with id
router.delete('/:id', appoitmentController.delete);

module.exports = router;
