const express = require('express');

const router = express.Router();
const topUpController = require('../controller/top_up_helper.js');

// Retrieve all users
router.get('/', topUpController.findAll);

// Create a new user
router.post('/', topUpController.create);

// Retrieve a single user with id
router.get('/:id', topUpController.findById);

// Update a user with id
router.put('/:id', topUpController.update);

// Delete a user with id
router.delete('/:id', topUpController.delete);

module.exports = router;
