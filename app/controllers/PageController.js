module.exports = function(app){
        const Publicacao = app.models.Publicacao;
        this.index = function (req, res) {
                var publicacoes = [{}];
                Publicacao.lastFour(function(err, results){
                        console.log(err);
                        console.log(results);
                        publicacoes = results;
                        res.render("index", {publicacoes: publicacoes});
                });
        };

        return this;
}