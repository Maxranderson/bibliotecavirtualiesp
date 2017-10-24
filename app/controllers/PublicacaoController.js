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
        res.render('admin/publicacao/form', { mensagem: msgm });

    };

    this.cadastra = function (req, res) {

        if (!req.body.ano_publicacao.length) req.body.ano_publicacao = null;
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

    this.alterar = function (req, res) {

    };

    this.deletar = function (req, res) {

    };

    return this;
}