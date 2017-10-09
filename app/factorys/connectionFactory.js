var mysql = require('mysql');
var config = require('../../config/config.json');

function createDBConnection(){
    if(require('../../config/localConfig.json')){
        config = require('../../config/localConfig.json');
    }
    return mysql.createConnection(config.database.default);
}

module.exports = function(){
    return createDBConnection;
}