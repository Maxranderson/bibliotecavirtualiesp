module.exports = function (app) {
    var publicacaoDAO = app.dao.PublicacaoDAO;

    function Publicacao() {
    }

    Publicacao.list = function (paginacao, callback) {
        publicacaoDAO.list(paginacao, callback);
    }

    Publicacao.insert = function (publicacao, callback) {
        publicacaoDAO.insert(publicacao, callback);
    }

    Publicacao.update = function (publicacao, callback) {

    }

    Publicacao.delete = function (publicacao, callback) {

    }

    return Publicacao;
}