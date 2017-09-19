var app = require('express')();
var consign = require('consign');
app.set('view engine', 'ejs');
app.set('views', './app/views');

module.exports = function () {
    consign().include('./app/controllers').into(app);

    return app;
}