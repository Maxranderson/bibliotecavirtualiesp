var server = require('./config/config.js')();

server.listen(server.locals.variables.porta, function () {
    
    console.log('Servidor rodando na porta: ' + server.locals.variables.porta);
    //Migração do banco
    //FIXME Problema com muitas querys no mesmo script
    // server.database.versionamento();
});
