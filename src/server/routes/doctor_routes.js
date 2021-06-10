const express = require('express');

const router = express.Router();
const doctorController = require('../controller/user_helper.js');

// Retrieve all employees
router.get('/', doctorController.findAll);

// Create a new employee
router.post('/', doctorController.create);

// Retrieve a single employee with id
router.get('/:id', doctorController.findById);

// Update a employee with id
router.put('/:id', doctorController.update);

// Delete a employee with id
router.delete('/:id', doctorController.delete);

module.exports = router;
