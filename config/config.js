var express = require('express');
var server = express();
var consign = require('consign');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config.json');
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
    server.use(session({secret: 'sssshhhh', resave:false, saveUninitialized: false}));
    server.use(passport.initialize());
    server.use(passport.session());

    //Importando as variáveis de ambiente do server
    server.locals.variables = config;
    //Verificando as variáveis locais e importando
    if(seExisteLocalConfig()){
        var local = require('./localConfig.json');
        server.locals.variables.database = local.database;
    }

    consign({cwd:'app'})
                .include('./controllers')
                .then('./dao')
                .then('./factorys')
                .then('./models')
                .then('./routes.js')
                .into(server);

    return server;
}