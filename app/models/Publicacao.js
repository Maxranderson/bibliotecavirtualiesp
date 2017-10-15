module.exports = function(app){
        var publicacaoDAO = app.dao.PublicacaoDAO;
    
    function Publicacao(){
    }

    Publicacao.prototype.list = function(paginacao, callback){
        publicacaoDAO.list(paginacao, callback);
    }

    Publicacao.prototype.insert = function(publicacao, callback){
        publicacao.ano_publicacao = null;
        publicacaoDAO.insert(publicacao, callback);
    }

    return Publicacao;
}