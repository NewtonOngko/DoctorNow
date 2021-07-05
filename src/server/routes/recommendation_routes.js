const express = require('express');

const router = express.Router();
const recommendationController = require('../controller/recommendation_helper.js');

// Retrieve all newss
router.get('/', recommendationController.findAll);

module.exports = router;
