const express = require('express');

const router = express.Router();
const changePasswordController = require('../model/user_model.js');

// change password user
router.put('/:id', changePasswordController.changePassword);

module.exports = router;
