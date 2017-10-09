var server = require('./config/config.js')();

server.listen(server.locals.variables.porta, function () {
    console.log('Servidor rodando na porta: ' + server.locals.variables.porta);
    //Migração do banco
    require('./database/versionamento')()(server);
});