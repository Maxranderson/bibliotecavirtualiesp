var express = require('express');
var server = express();
var consign = require('consign');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function () {
    server.set('view engine', 'ejs');
    server.set('views', './app/views');
    server.use(express.static('public'));
    server.use(bodyParser.urlencoded({extended: true}));
    server.use(bodyParser.json());
    server.use(session({secret: 'sssshhhh', resave:false, saveUninitialized: false}));

    consign().include('./app/controllers')
                .then('./app/dao')
                .then('./app/factorys')
                .then('./app/models')
                .into(server);

    return server;
}