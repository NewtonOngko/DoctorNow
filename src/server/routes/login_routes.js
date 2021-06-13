const express = require('express');

const router = express.Router();
const loginController = require('../controller/login_helper.js');

// user login
router.post('', loginController.login);

module.exports = router;
