module.exports = function (app) {
    
    var User = app.models.User;
    this.lista = function(req, res){
        var paginacao = {
            currentPage: req.query.page || 1,
            pageCount: 1,
            pageSize: 10,
        }
        User.list(paginacao,function(erro, results, count){
            if(erro){
                console.log(erro);
                res.render('admin/user/lista',{paginacao:paginacao,usuarios:{},erros:erro})
            }
            paginacao.pageCount = Math.ceil(count/paginacao.pageSize);
            res.render('admin/user/lista',{paginacao:paginacao,usuarios:results,erros:{}});
        });
    };

    this.form = function(req, res){
        var msgm = {}
        if(req.session.msgm){
            msgm = req.session.msgm;
            req.session.msgm = null;
        }      
        res.render('admin/user/form', {mensagem:msgm});
    };

    this.cadastra = function(req, res){
        User.create(req.body.username, req.body.password, function(err, results){
            if(err){
                console.log(err);
            }
        });
        res.redirect('/admin/usuarios/cadastrar');
    };
    
    return this;
}