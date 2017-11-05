module.exports = function(app){
    var knex = require('knex')({client: app.locals.variables.database.client, connection: process.env.DATABASE_URL || app.locals.variables.database.default});
    // var mysql = require('mysql');
    
    function createDBConnection(){
        return knex;
    }

    return createDBConnection;
}