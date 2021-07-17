const express = require('express');

const router = express.Router();
const topUpDetailController = require('../controller/top_up_detail_helper.js');

// Retrieve all users
router.get('/', topUpDetailController.findAll);

// Create a new user
router.post('/', topUpDetailController.create);

// Retrieve a single user with id
router.get('/:id', topUpDetailController.findById);

// Update a user with id
router.put('/:id', topUpDetailController.update);

// Delete a user with id
router.delete('/:id', topUpDetailController.delete);

module.exports = router;
