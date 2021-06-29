const express = require('express');

const router = express.Router();
const appointmentController = require('../controller/appointment_helper.js');

// Retrieve all Appointment
router.get('/', appointmentController.findAll);

// Create a new Appointment
router.post('/', appointmentController.create);

// Retrieve a single Appointment with id
router.get('/:id', appointmentController.findById);

// Update a Appointment with id
router.put('/:id', appointmentController.update);

// Delete a Appointment with id
router.delete('/:id', appointmentController.delete);

module.exports = router;
