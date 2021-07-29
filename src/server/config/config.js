const { env } = process;
const mysql = require('mysql');

const dbConfig = {
  host: env.DB_HOST || '185.28.21.155',
  user: env.DB_USER || 'u166022488_doctornow',
  password: env.DB_PASSWORD || 'Skripsi2020',
  database: env.DB_NAME || 'u166022488_doctornow',
};
let config;
function handleDisconnect() {
  config = mysql.createPool(dbConfig);
  console.log('running DB');
}
handleDisconnect();


module.exports = config;
