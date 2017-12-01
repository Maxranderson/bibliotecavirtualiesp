module.exports = function (app) {

    const Publicacao = app.models.Publicacao;
    const Mensagem = app.models.Mensagem;
    const PublicacaoSearchFactory = app.factorys.PublicacaoSearchFactory;

    this.index = function (req, res) {
        Publicacao.lastFour(function (err, results) {
            var publicacoes = [{}];
            var msgm = new Mensagem();

            if (err) {
                console.error(err);
                msgm.addError(err.message);
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
        if(req.query.keyWord){
            Publicacao.listWithSearch(PublicacaoSearchFactory.newFilterFromSimpleSearch(req.query), paginacao, listarPublicacoes);
        }else{
            Publicacao.list(paginacao, listarPublicacoes);
        }
        function listarPublicacoes(erro, results, count){
            var publicacoes = [{}];
            var msgm = new Mensagem();
            msgm.addError(req.flash('dangerMessage'));
            msgm.addSuccess(req.flash('successMessage'));
            if (erro) {
                console.error(erro);
                msgm.addError(erro.message);
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
        }
    };



    return this;
};