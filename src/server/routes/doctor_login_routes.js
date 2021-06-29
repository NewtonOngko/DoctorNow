const express = require('express');

const router = express.Router();
const doctorLoginController = require('../model/doctor_model.js');

// user login
router.post('', doctorLoginController.login);

module.exports = router;
