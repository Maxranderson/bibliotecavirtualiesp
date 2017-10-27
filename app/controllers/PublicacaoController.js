module.exports = function (app) {

    var Publicacao = app.models.Publicacao;

    this.lista = function (req, res) {

        var paginacao = {
            currentPage: req.query.page || 1,
            pageCount: 1,
            pageSize: 10,
        }
        var msgm = {}
        var danger = req.flash('dangerMessage');
        var success = req.flash('successMessage');
        if (danger.length) msgm.danger = danger;
        if (success.length) msgm.success = success;
        Publicacao.list(paginacao, function (erro, results) {
            if (erro) {
                console.log(erro);
                res.render('admin/publicacao/lista', { paginacao: paginacao, publicacoes: {}, mensagem: { danger: erro } })
            }
            res.render('admin/publicacao/lista', { paginacao: paginacao, publicacoes: results, mensagem: msgm });
        });

    };

    this.form = function (req, res) {

        var msgm = {}
        var danger = req.flash('dangerMessage');
        var success = req.flash('successMessage');
        if (danger.length) msgm.danger = danger;
        if (success.length) msgm.success = success;
        res.render('admin/publicacao/form', { mensagem: msgm, publicacao:{} });

    };

    this.cadastra = function (req, res) {

        var publicacao = req.body;
        var keys = Object.keys(publicacao);
        for(var i = 0;i<keys.length;i++) if(!publicacao[keys[i]]) delete publicacao[keys[i]];

        Publicacao.insert(req.body, function (erro, result) {
            if (erro) {
                console.log(erro);
                req.flash('dangerMessage', erro);
            } else {
                req.flash('successMessage', app.locals.variables.mensagem.publicacao.sucesso);
            }
            res.redirect('/admin/publicacoes/cadastrar');
        });

    };

    this.alteraForm = function(req, res){
        Publicacao.findById({id: req.params.id}, function(err, results){
            var msgm = {};
            var publicacao = {};
            if(err) msgm.danger = err;
            if(!results.length){
                msgm.danger = app.locals.variables.mensagem.publicacao.naoEncontrado;
            }else{
                publicacao = results[0];
            }
            res.render('admin/publicacao/form', {mensagem:msgm, publicacao:publicacao});

        });
    };

    this.alterar = function (req, res) {
        var publicacao = req.body;
        var keys = Object.keys(publicacao);
        for(var i = 0;i<keys.length;i++) if(!publicacao[keys[i]]) delete publicacao[keys[i]];

        Publicacao.update(req.body, function(err, results){
            if(err){
                req.flash('dangerMessage', err.message);
            }else{
                req.flash('successMessage', app.locals.variables.mensagem.publicacao.sucessoAlterado);
            }
            res.redirect('/admin/publicacoes');
        });

    };

    this.deletar = function (req, res) {

        Publicacao.delete({id: req.body.id}, function(err, results){
            if(err){
                req.flash('dangerMessage', err);
            }else{
                req.flash('successMessage', app.locals.variables.mensagem.publicacao.sucessoDeletado);
            }
            res.redirect('/admin/publicacoes');
        });

    };

    return this;
}