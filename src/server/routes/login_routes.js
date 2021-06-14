const express = require('express');

const router = express.Router();
const loginController = require('../model/user_model.js');

// user login
router.post('', loginController.login);

module.exports = router;
