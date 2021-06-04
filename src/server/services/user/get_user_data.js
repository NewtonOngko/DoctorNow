const helper = require('server/helper/helper.js');
const config = require('server/config/config.js');

const db = require('../db.js');

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
