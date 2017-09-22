var express = require('express');
var app = express();
var consign = require('consign');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function () {
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(session({secret: 'sssshhhh', resave:false, saveUninitialized: false}));

    consign().include('./app/controllers').into(app);

    return app;
}