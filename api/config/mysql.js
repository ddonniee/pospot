var mysql = require('mysql2');
var db_info = {
    host: '3.38.129.8',
    port: '3309',
    user: process.env.DBID,
    password: process.env.DBPWD,
    database: 'vote'
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