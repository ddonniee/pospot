var mysql = require('mysql2');
var db_info = {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: process.env.DBID,
    password: process.env.DBPWD,
    database: process.env.DBNAME
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}