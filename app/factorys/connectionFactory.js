var mysql = require('mysql');

function createDBConnection(){
    return mysql.createConnection({
        host: '192.168.1.17',
        user: 'root',
        password: 'teste123',
        database: 'biblioteca_digital'
    });
}

module.exports = function(){
    return createDBConnection;
}