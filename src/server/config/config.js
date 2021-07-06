const { env } = process;
const mysql = require('mysql');

const dbConfig = {
  host: env.DB_HOST || 'remotemysql.com',
  user: env.DB_USER || 'gbSm65qWO0',
  password: env.DB_PASSWORD || 'TsiRHWudYt',
  database: env.DB_NAME || 'gbSm65qWO0',
};
let config;
function handleDisconnect() {
  config = mysql.createPool(dbConfig);
  console.log('running DB');
}
handleDisconnect();


module.exports = config;
