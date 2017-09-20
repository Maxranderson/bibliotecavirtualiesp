var app = require('./config/config.js')();

var porta = 3000;

app.listen(porta, function () {
    console.log('Servidor rodando na porta: ' + porta);
});