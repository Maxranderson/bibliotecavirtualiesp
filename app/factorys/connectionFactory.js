var mysql = require('mysql');
var config = require('../../config/config.json');

function seExisteLocalConfig(){
    try{
        require('../../config/localConfig.json');
        return true;
    }catch(e){
        return false;
    }
}

function createDBConnection(){
    if(seExisteLocalConfig()){
        config = require('../../config/localConfig.json');
    }
    return mysql.createConnection(config.database.default);
}

module.exports = function(){
    return createDBConnection;
}