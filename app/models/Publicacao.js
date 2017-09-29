function Publicacao(){
    var PublicacaoDAO = require('../dao/PublicacaoDAO')();
    this._publicacaoDAO = new PublicacaoDAO();
}

Publicacao.prototype.list = function(callback){
    this._publicacaoDAO.list(callback);
}

Publicacao.prototype.insert = function(publicacao, callback){
    publicacao.ano_publicacao = null;
    this._publicacaoDAO.insert(publicacao, callback);
}

module.exports = function(){
    return Publicacao;
}