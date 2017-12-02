module.exports = function(app) {
    var controllers = app.controllers;
    var multer = require('multer');
    var upload = multer({dest: './files/tmp/', fileFilter: controllers.PublicacaoController.fileFilter, limits:{ fileSize: 512000000}});
    //Rotas das páginas do front
    app.get('/', controllers.PageController.index);
    app.get('/publicacoes', controllers.PageController.listaPublicacoes);
    app.post('/publicacoes', controllers.PageController.addSearchInSession, controllers.PageController.listaPublicacoes);
    app.get('/files/publicacoes/:nome', controllers.PublicacaoController.downloadFile);
    app.get('/files/capas/:nome', controllers.PublicacaoController.downloadImage);

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
    app.post('/admin/publicacoes', upload.fields([{name: 'arquivo', maxCount: 1}, {name: 'capa', maxCount: 1}]),
        controllers.PublicacaoController.cadastraError,
        controllers.PublicacaoController.formValidationRules,
        controllers.PublicacaoController.validarCadastra,
        controllers.PublicacaoController.cadastra);
    app.get('/admin/publicacoes/alterar/:id', controllers.PublicacaoController.alteraForm);
    app.post('/admin/publicacoes/alterar', upload.fields([{name: 'arquivo', maxCount: 1}, {name: 'capa', maxCount: 1}]),
        controllers.PublicacaoController.alterarError,
        controllers.PublicacaoController.formValidationRules,
        controllers.PublicacaoController.validarAlterar,
        controllers.PublicacaoController.alterar);
    app.post('/admin/publicacoes/deletar', controllers.PublicacaoController.deletar);
    //Fim das rotas de admin
    

    //Rotas de erro
    app.use(function(req,res,next){
        res.status(404).render('404');
    });
}