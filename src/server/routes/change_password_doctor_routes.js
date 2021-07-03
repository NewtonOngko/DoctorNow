const express = require('express');

const router = express.Router();
const changePasswordController = require('../model/doctor_model.js');

// change password user
router.patch('/:id', changePasswordController.changePassword);

module.exports = router;
