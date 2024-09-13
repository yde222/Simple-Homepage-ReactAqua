var mysql = require('mysql2');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kim0821pg',
    database: 'testdbaqua'
});
db.connect();

module.exports = db;
