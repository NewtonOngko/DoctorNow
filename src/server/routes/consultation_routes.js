const express = require('express');

const router = express.Router();
const consultationController = require('../controller/consultation_helper.js');

// Retrieve all consultation
router.get('/', consultationController.findAll);

// Create a new consultation
router.post('/', consultationController.create);

// Retrieve a single consultation with id
router.get('/:id', consultationController.findById);

// Update a consultation with id
router.put('/:id', consultationController.update);

// Delete a consultation with id
router.delete('/:id', consultationController.delete);

module.exports = router;
