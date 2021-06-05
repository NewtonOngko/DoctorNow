const db = require('./db.js');
const helper = require('../helper/helper.js');
const config = require('../config/config.js');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT * FROM `users` LIMIT 10',
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

module.exports = {
  getMultiple
};
