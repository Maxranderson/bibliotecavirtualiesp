var server = require('./config/config.js')();

server.listen(process.env.PORT, function () {
    
    console.log('Servidor rodando na porta: ' + process.env.PORT);
    //Migração do banco
    //FIXME Problema com muitas querys no mesmo script
    // server.database.versionamento();
});
