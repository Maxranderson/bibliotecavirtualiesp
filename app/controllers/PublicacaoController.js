module.exports = function (app) {
    
    this.lista = function(req, res){
        var paginacao = {
            currentPage: 1,
            pageCount: 5,
            pageSize: 10,
        }
        if(req.query.page){
            paginacao.currentPage = req.query.page;
        }
        var publicacao = new app.models.Publicacao();
        publicacao.list(function(erro, results){
            if(erro){
                console.log(erro);
                res.render('admin/publicacao/lista',{paginacao:paginacao,publicacoes:{},erros:erro})
            }
            res.render('admin/publicacao/lista',{paginacao:paginacao,publicacoes:results,erros:{}});
        });
    };

    this.form = function(req, res){
        var msgm = {}
        if(req.session.msgm){
            msgm = req.session.msgm;
            req.session.msgm = null;
        }      
        res.render('admin/publicacao/form', {mensagem:msgm});
    };

    this.cadastra = function(req, res){
        var publicacao = new app.models.Publicacao();
        publicacao.insert(req.body, function(erro, result, fields){
            req.session.msgm = {};
            if(erro){
                console.log(erro);
                req.session.msgm.erro = erro.msg;
            }else{
                req.session.msgm.sucesso = "Publicação cadastrada com sucesso!";
            }
            res.redirect('/admin/publicacoes/cadastrar');
        });
    };
    
    return this;
}