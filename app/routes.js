module.exports = function(app) {
    var controllers = app.controllers;
    //Rotas das páginas do front
    app.get('/', controllers.PageController.index);

    app.get('/login', controllers.AuthenticationController.login);
    app.post('/login', controllers.AuthenticationController.logar);
    app.post('/logout', controllers.AuthenticationController.logout);
    //Fim das rotas das páginas do front

    //Rotas de admin
    //Middleware de autenticação, têm que vim antes das rotas
    app.all('/admin\*', function(req, res, next){
        //TODO: implementar middleware de usuário
        console.log("Passou pelo middleware de segurança!");
        next();
    });

    app.get('/admin', controllers.AdminController.index);
    
    app.get('/admin/publicacoes', controllers.PublicacaoController.lista);
    app.get('/admin/publicacoes/cadastrar', controllers.PublicacaoController.form);
    app.post('/admin/publicacoes', controllers.PublicacaoController.cadastra);
    //Fim das rotas de admin
}