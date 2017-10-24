module.exports = function (app) {
    
    var User = app.models.User;
    this.lista = function(req, res){
        var paginacao = {
            currentPage: req.query.page || 1,
            pageCount: 1,
            pageSize: 10,
        };

        var msgm = {};
        var danger = req.flash('dangerMessage');
        var success = req.flash('successMessage');
        if(danger.length) msgm.danger = danger;
        if(success.length) msgm.success = success;

        User.list(paginacao,function(erro, results, count){
            if(erro){
                console.log(erro);
                res.render('admin/user/lista',{paginacao:paginacao,usuarios:{},mensagem:{danger: erro}});
            }
            paginacao.pageCount = Math.ceil(count/paginacao.pageSize);
            res.render('admin/user/lista',{paginacao:paginacao,usuarios:results,mensagem:msgm});
        });
    };

    this.form = function(req, res){
        var msgm = {};
        var danger = req.flash('dangerMessage');
        var success = req.flash('successMessage');
        if(danger.length) msgm.danger = danger;
        if(success.length) msgm.success = success;
        res.render('admin/user/form', {mensagem:msgm, user:{}});
    };

    this.alteraForm = function(req, res){
        User.findById(req.params.id, function(err, results){
            var msgm = {};
            var user = {};
            if(err) msgm.danger = err;
            if(!results.length){
                msgm.danger = app.locals.variables.mensagem.usuario.naoEncontrado;
            }else{
                user = results[0];
            }
            res.render('admin/user/form', {mensagem:msgm, user:user});

        });
    };

    this.alterar = function(req, res){
        User.update({id: req.body.id, password: req.body.password}, function(err, results){
            if(err){
                req.flash('dangerMessage', err);
            }else{
                req.flash('successMessage', app.locals.variables.mensagem.usuario.sucessoAlterado);
            }
            res.redirect('/admin/usuarios');
        });
    };

    this.deletar = function(req, res){
        User.delete({id: req.body.id}, function(err, results){
            if(err){
                req.flash('dangerMessage', err);
            }else{
                req.flash('successMessage', app.locals.variables.mensagem.usuario.sucessoDeletado);
            }
            res.redirect('/admin/usuarios');
        });
    }

    this.cadastra = function(req, res){
        User.create(req.body.username, req.body.password, function(err, results){
            if(err){
                req.flash('dangerMessage', err);
            }else{
                req.flash('successMessage', app.locals.variables.mensagem.usuario.sucesso);
            }
            res.redirect('/admin/usuarios/cadastrar');
        });
    };
    
    return this;
}