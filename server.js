var server = require('./config/config.js')();

var porta = 3000;

server.listen(porta, function () {
    console.log('Servidor rodando na porta: ' + porta);
    //Migração do banco
    require('./database/versionamento')()(server);
});