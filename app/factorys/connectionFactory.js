module.exports = function(app){
    var knex = require('knex')({client: app.locals.variables.database.client, connection: app.locals.variables.database.default});
    // var mysql = require('mysql');
    
    function createDBConnection(){
        return knex;
    }

    return createDBConnection;
}