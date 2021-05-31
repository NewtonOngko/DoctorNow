const express = require('express');
const router = express.Router();
const programmingLanguages = require('../services/get_data.js');

/* GET users. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users data `, err.message);
    next(err);
  }
});

module.exports = router;

