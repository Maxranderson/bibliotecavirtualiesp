module.exports = function(app){
    
    function Publicacao(){
        this._publicacaoDAO = new app.dao.PublicacaoDAO();
    }

    Publicacao.prototype.list = function(callback){
        this._publicacaoDAO.list(callback);
    }

    Publicacao.prototype.insert = function(publicacao, callback){
        publicacao.ano_publicacao = null;
        this._publicacaoDAO.insert(publicacao, callback);
    }

    return Publicacao;
}