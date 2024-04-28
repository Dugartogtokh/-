const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: '127.0.0.1:3306',
  user: 'root',
  password: 'tidyhunter1',
  database: 'taskmanagement',
});
function healthcheck(callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      callback(err, null);
      return;
    }

    connection.ping(function(err) {
      connection.release();
      if (err) {
        callback(err, null);
      } else {
        callback(null, true);
      }
    });
  });
}

module.exports = {
  healthcheck,
};