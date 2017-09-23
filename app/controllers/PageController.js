module.exports = function (server) {
    server.get('/', function (req, res) {
        var publicacao = new server.app.models.Publicacao();
        res.render("index");
    });

    server.get('/admin', function(req, res){
        res.render('admin/index');
    });
}