module.exports = function(app){
    
    var mysql = require('mysql');
    
    function createDBConnection(){
        return mysql.createConnection(app.locals.variables.database.default);
    }

    return createDBConnection;
}