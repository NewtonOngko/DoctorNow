const { env } = process;
const mysql = require('mysql');
var db_config={
  host: env.DB_HOST || 'remotemysql.com',
  user: env.DB_USER || 'gbSm65qWO0',
  password: env.DB_PASSWORD || 'hI0rR4Y4vJ',
  database: env.DB_NAME || 'gbSm65qWO0',
}
var config;
function handleDisconnect(){
  config =mysql.createPool(db_config);
  console.log('running DB')
}
handleDisconnect();


module.exports = config;
