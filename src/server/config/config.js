const { env } = process;
const mysql = require('mysql');

const dbConfig = {
  host: env.DB_HOST || 'sql6.freemysqlhosting.net',
  user: env.DB_USER || 'sql6424896',
  password: env.DB_PASSWORD || 'PAtPmGBQT2',
  database: env.DB_NAME || 'sql6424896',
};
let config;
function handleDisconnect() {
  config = mysql.createPool(dbConfig);
  console.log('running DB');
}
handleDisconnect();


module.exports = config;
