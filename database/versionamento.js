function migrarBanco(server){
    var versaoBanco = 1;
    console.log("Migrando o banco para a versão "+versaoBanco);
    var scripts = importarScripts(versaoBanco);

    var mysql = require('mysql');
    var connectionConfig = server.locals.variables.database.default;
    var connection = mysql.createConnection(connectionConfig);
    for(var i = 0; i<scripts.length; i++){
        var numero = i+1;
        connection.query(scripts[i], function(erro, results){
            if(erro){
                console.log("Script com erro "+(numero)+" : "+ erro);
                return;
            }
            console.log("Script "+(numero)+" rodado");
        });

    }
    connection.end();
}

function importarScripts(versaoBanco){
    var scripts = []
    for(var i = 1; i <= versaoBanco; i++){
        var script = require('./'+i);
        scripts.push(script);
    }
    return scripts;
}

module.exports = function(){
    return migrarBanco;
}