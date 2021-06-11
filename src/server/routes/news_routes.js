const express = require('express');

const router = express.Router();
const newsController = require('../controller/news_helper.js');

// Retrieve all newss
router.get('/', newsController.findAll);

// Create a new news
router.post('/', newsController.create);

// Retrieve a single news with id
router.get('/:id', newsController.findById);

// Update a news with id
router.put('/:id', newsController.update);

// Delete a news with id
router.delete('/:id', newsController.delete);

module.exports = router;
