module.exports = function (app) {
    
    var User = app.models.User;
    var Mensagem = app.models.Mensagem;

    this.lista = function(req, res){
        var paginacao = {
            currentPage: req.query.page || 1,
            pageCount: 1,
            pageSize: 10,
        };

        User.list(paginacao,function(erro, results, count){
            var usuarios = [{}];
            var msgm = new Mensagem();
            msgm.addError(req.flash('dangerMessage'));
            msgm.addSuccess(req.flash('successMessage'));
            if(erro){
                msgm.addError(erro);
                console.error(erro);
            }
            if(results) if(results.length){
                usuarios = results;
            }
            paginacao.pageCount = Math.ceil(count/paginacao.pageSize);
            res.render('admin/user/lista',{paginacao:paginacao,usuarios:usuarios,mensagem:msgm});
        });
    };

    this.form = function(req, res){
        var msgm = new Mensagem();

        msgm.addError(req.flash('dangerMessage'));
        msgm.addSuccess(req.flash('successMessage'));

        res.render('admin/user/form', {mensagem:msgm, user:{}});
    };

    this.alteraForm = function(req, res){
        User.findById(req.params.id, function(err, results){
            var msgm = new Mensagem();
            var user = {};
            if(err) msgm.addError(err);
            if(!results.length){
                msgm.addError(app.locals.variables.mensagem.usuario.naoEncontrado);
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