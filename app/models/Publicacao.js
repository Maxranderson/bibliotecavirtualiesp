function Publicacao(){
    var PublicacaoDAO = require('../dao/PublicacaoDAO')();
    this._publicacaoDAO = new PublicacaoDAO();
    console.log(this._publicacaoDAO);
}

module.exports = function(){
    return Publicacao;
}