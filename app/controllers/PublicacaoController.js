module.exports = function (server) {
    server.get('/admin/publicacoes', function(req, res){
        var paginacao = {
            currentPage: 1,
            pageCount: 5,
            pageSize: 10,
        }
        if(req.query.page){
            paginacao.currentPage = req.query.page;
        }
        res.render('admin/publicacao/lista',{paginacao:paginacao,publicacoes:{}});
    });

    server.get('/admin/publicacoes/cadastrar', function(req, res){
        res.render('admin/publicacao/form');
    });
}