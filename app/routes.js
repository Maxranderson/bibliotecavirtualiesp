module.exports = function(app) {
    var controllers = app.controllers;
    //Rotas das páginas do front
    app.get('/', controllers.PageController.index);

    app.get('/login', controllers.AuthenticationController.login);
    app.post('/login', app.locals.passport.authenticate('local-login',{
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    app.post('/logout', controllers.AuthenticationController.logout);
    //Fim das rotas das páginas do front

    //Rotas de admin
    //Middleware de autenticação, têm que vim antes das rotas
    app.all('/admin\*', controllers.AuthenticationController.estaLogado);

    app.get('/admin', controllers.AdminController.index);

    app.get('/admin/usuarios', controllers.UserController.lista);
    app.get('/admin/usuarios/cadastrar', controllers.UserController.form);
    app.post('/admin/usuarios', controllers.UserController.cadastra);
    app.get('/admin/usuarios/alterar/:id', controllers.UserController.alteraForm);
    app.post('/admin/usuarios/alterar', controllers.UserController.alterar);
    app.post('/admin/usuarios/deletar', controllers.UserController.deletar);
    
    app.get('/admin/publicacoes', controllers.PublicacaoController.lista);
    app.get('/admin/publicacoes/cadastrar', controllers.PublicacaoController.form);
    app.post('/admin/publicacoes', controllers.PublicacaoController.cadastra);
    app.get('/admin/publicacoes/alterar/:id', controllers.PublicacaoController.alteraForm);
    app.post('/admin/publicacoes/alterar', controllers.PublicacaoController.alterar);
    app.post('/admin/publicacoes/deletar', controllers.PublicacaoController.deletar); //TODO: Finalizar o método e descomentar a rota
    //Fim das rotas de admin


    //Rotas de erro
    app.use(function(req,res,next){
        res.status(404).render('404');
    });
}