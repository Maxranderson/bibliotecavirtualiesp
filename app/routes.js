module.exports = function(app) {
    var controllers = app.controllers;
    
    app.get('/', controllers.PageController.index);

    app.get('/admin', controllers.AdminController.index);

    app.get('/admin/publicacoes', controllers.PublicacaoController.lista);

    // server.post('/admin/publicacoes', );
}