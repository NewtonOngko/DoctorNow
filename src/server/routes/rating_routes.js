const express = require('express');

const router = express.Router();
const ratingController = require('../controller/rating_helper.js');

// Retrieve all newss
router.get('/', ratingController.findAll);

// Create a new news
router.post('/', ratingController.create);

// Retrieve a single news with id
router.get('/:id', ratingController.findById);

// Update a news with id
router.put('/:id', ratingController.update);

// Delete a news with id
router.delete('/:id', ratingController.delete);

module.exports = router;
