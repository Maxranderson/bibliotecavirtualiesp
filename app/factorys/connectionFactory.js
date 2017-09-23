var mysql = require('mysql');
var config = require('../../config/dbConfig');

function createDBConnection(){
    return mysql.createConnection(config);
}

module.exports = function(){
    return createDBConnection;
}