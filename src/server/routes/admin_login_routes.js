const express = require('express');

const router = express.Router();
const adminLoginController = require('../model/admin_model.js');

// user login
router.post('/', adminLoginController.adminLogin);

module.exports = router;
