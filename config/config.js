var express = require('express');
var server = express();
var consign = require('consign');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function () {
    server.set('view engine', 'ejs');
    server.set('views', './server/views');
    server.use(express.static('public'));
    server.use(bodyParser.urlencoded({extended: true}));
    server.use(bodyParser.json());
    server.use(session({secret: 'sssshhhh', resave:false, saveUninitialized: false}));

    consign().include('./server/controllers')
                .then('./server/dao')
                .then('./server/factorys')
                .then('./server/models')
                .into(server);

    return server;
}