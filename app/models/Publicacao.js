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

    //TODO: implementar o método
    Publicacao.update = function (publicacao, callback) {

    }

    //TODO: implementar o método
    Publicacao.delete = function (publicacao, callback) {

    }

    return Publicacao;
}