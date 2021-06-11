const express = require('express');

const router = express.Router();
const recommendationController = require('../controller/recommendation_helper.js');

// Retrieve all newss
router.get('/', recommendationController.findAll);

// Create a new news
router.post('/', recommendationController.create);

// Retrieve a single news with id
router.get('/:id', recommendationController.findById);

// Update a news with id
router.put('/:id', recommendationController.update);

// Delete a news with id
router.delete('/:id', recommendationController.delete);

module.exports = router;
