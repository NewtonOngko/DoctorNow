const { env } = process;
const mysql = require('mysql');

// function handleDisconnect() {
//   config = mysql.createPool(dbConfig);
//   console.log('running DB');
// }
// handleDisconnect();

var conn = mysql.createConnection({
  host: env.DB_HOST || 'remotemysql.com',
  user: env.DB_USER || 'gbSm65qWO0',
  password: env.DB_PASSWORD || 'TsiRHWudYt',
  database: env.DB_NAME || 'gbSm65qWO0',
});

conn.connect(err => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    throw err
  }
 
  console.log('connected as id ' + conn.threadId);
});

module.exports = conn;
