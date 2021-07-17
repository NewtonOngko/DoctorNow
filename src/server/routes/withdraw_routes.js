const express = require('express');

const router = express.Router();
const withdrawController = require('../controller/withdraw_helper.js');

// Retrieve all withdraws
router.get('/', withdrawController.findAll);

// Create a new withdraw
router.post('/', withdrawController.create);

// Retrieve a single withdraw with id
router.get('/:id', withdrawController.findById);

// Update a withdraw with id
router.put('/:id', withdrawController.update);

// Delete a withdraw with id
router.delete('/:id', withdrawController.delete);

module.exports = router;
