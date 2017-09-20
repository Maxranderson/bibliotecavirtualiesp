var express = require('express');
var app = express();
var consign = require('consign');
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('public'));

module.exports = function () {
    consign().include('./app/controllers').into(app);

    return app;
}