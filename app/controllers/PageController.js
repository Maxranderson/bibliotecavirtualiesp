module.exports = function(app){
        const Publicacao = app.models.Publicacao;
        this.index = function (req, res) {
                var publicacoes = [{}];
                Publicacao.lastFour(function(err, results){
                        publicacoes = results;
                        res.render("index", {publicacoes: publicacoes});
                });
        };

        this.listaPublicacoes = function(req,res){
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
                    Publicacao.list(paginacao, function (erro, results, count) {
                        if (erro) {
                            console.log(erro);
                            res.render('publicacao/lista', { paginacao: paginacao, publicacoes: {}, mensagem: { danger: erro } })
                        }
                        paginacao.pageCount = Math.ceil(count/paginacao.pageSize);
                        res.render('publicacao/lista', { paginacao: paginacao, publicacoes: results, mensagem: msgm, downloadPath: (app.locals.variables.downloadPath+'publicacoes/') });
                    });
        }

        return this;
}