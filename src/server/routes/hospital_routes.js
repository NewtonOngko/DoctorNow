const express = require('express');

const router = express.Router();
const hospitalController = require('../controller/hospital_helper.js');

// Retrieve all hospitals
router.get('/', hospitalController.findAll);

// Create a new hospital
router.post('/', hospitalController.create);

// Retrieve a single hospital with id
router.get('/:id', hospitalController.findById);

// Update a hospital with id
router.put('/:id', hospitalController.update);

// Delete a hospital with id
router.delete('/:id', hospitalController.delete);

module.exports = router;
