const { env } = process;
const mysql = require('mysql');

const config = mysql.createConnection({
  host: env.DB_HOST || 'remotemysql.com',
  user: env.DB_USER || 'gbSm65qWO0',
  password: env.DB_PASSWORD || 'hI0rR4Y4vJ',
  database: env.DB_NAME || 'gbSm65qWO0',
});

config.connect((err) => {
  if (err) throw err;
  console.log('Database Connected!');
});

module.exports = config;
