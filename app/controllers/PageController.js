module.exports = function (app) {

    const Publicacao = app.models.Publicacao;
    const Mensagem = app.models.Mensagem;

    this.index = function (req, res) {
        Publicacao.lastFour(function (err, results) {
            var publicacoes = [{}];
            var msgm = new Mensagem();

            if (err) {
                msgm.addError(err);
                console.error(err);
            }

            if(results) if (results.length) {
                publicacoes = results;
            }
            res.render("index", {publicacoes: publicacoes, mensagem: msgm});
        });
    };

    this.listaPublicacoes = function (req, res) {
        var paginacao = {
            currentPage: req.query.page || 1,
            pageCount: 1,
            pageSize: 10
        };
        Publicacao.list(paginacao, function (erro, results, count) {
            var publicacoes = [{}];
            var msgm = new Mensagem();
            msgm.addError(req.flash('dangerMessage'));
            msgm.addSuccess(req.flash('successMessage'));
            if (erro) {
                msgm.addError(erro);
                console.error(erro);
            }
            if(results) if (results.length) {
                publicacoes = results;
            }
            paginacao.pageCount = Math.ceil(count / paginacao.pageSize);
            res.render('publicacao/lista', {
                paginacao: paginacao,
                publicacoes: publicacoes,
                mensagem: msgm,
                downloadPath: (app.locals.variables.downloadPath + 'publicacoes/')
            });
        });
    };

    return this;
};