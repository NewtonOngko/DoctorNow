const express = require('express');

const router = express.Router();
const adminController = require('../controller/admin_helper.js');

// Create a new user
router.post('/', adminController.create);

// Update a user with id
router.put('/:id', adminController.update);

module.exports = router;
