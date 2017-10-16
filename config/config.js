var express = require('express');
var server = express();
var consign = require('consign');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var config = require('./config.json');
var flash = require('connect-flash');
var passport = require('passport');

function seExisteLocalConfig(){
    try{
        require('./localConfig.json');
        return true;
    }catch(e){
        return false;
    }
}

module.exports = function () {

    server.set('view engine', 'ejs');
    server.set('views', './app/views');
    server.use(express.static('public'));
    server.use(bodyParser.urlencoded({extended: true}));
    server.use(bodyParser.json());
    server.use(cookieParser('gatinho feliz'));

    //Configurando o passport
    server.use(session({secret: 'sssshhhh', resave:false, saveUninitialized: false}));
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(flash());
    server.locals.passport = passport;

    //Importando as variáveis de ambiente do server
    server.locals.variables = config;
    //Verificando as variáveis locais e importando
    if(seExisteLocalConfig()){
        var local = require('./localConfig.json');
        server.locals.variables.database = local.database;
    }

    consign({cwd:'app'})
                .include('./factorys')
                .then('./dao')
                .then('./models')
                .then('./controllers')
                .then('./routes.js')
                .into(server);

    consign().include('./database/versionamento.js').into(server);
    
    //Conta de administrador
    server.models.User.findByUsername(server.locals.variables.administrador.username, function(err, results){
        if(!results.length){
            server.models.User.create(server.locals.variables.administrador.username, server.locals.variables.administrador.senha, function(err, results){});
        }
    });
    require('./passport.js')(server, passport);

    return server;
}