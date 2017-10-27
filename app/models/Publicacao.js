module.exports = function (app) {

    var PublicacaoDAO = app.dao.PublicacaoDAO;

    function Publicacao() {
    }

    Publicacao.list = function (paginacao, callback) {
        PublicacaoDAO.list(paginacao, callback);
    }

    Publicacao.insert = function (publicacao, callback) {
        PublicacaoDAO.insert(publicacao, callback);
    }

    Publicacao.findById = function (id, callback) {

        PublicacaoDAO.findById(id, callback);
        
    }

    Publicacao.update = function (publicacao, callback) {

        PublicacaoDAO.update(publicacao, callback);

    }

    Publicacao.delete = function (publicacao, callback) {

        PublicacaoDAO.delete(publicacao, callback);

    }

    return Publicacao;
}