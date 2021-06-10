const { env } = process;
const mysql = require('mysql');
const q = require('q');
var db_config={
  host: env.DB_HOST || 'remotemysql.com',
  user: env.DB_USER || 'gbSm65qWO0',
  password: env.DB_PASSWORD || 'hI0rR4Y4vJ',
  database: env.DB_NAME || 'gbSm65qWO0',
}
var config;
function handleDisconnect(){
  var d = q.defer();
  config =mysql.createConnection(db_config);
  config.connect((err) => {
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      d.reject
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } 
    else{
      console.log('Database Connected!');
      d.resolve(config)
    }
    return d.promise;
  });
  config.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}
handleDisconnect();


module.exports = config;
