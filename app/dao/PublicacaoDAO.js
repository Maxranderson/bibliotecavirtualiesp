function PublicacaoDAO(){
    this._connectionConfig = require('../factorys/connectionFactory')();
}

module.exports = function(){
    return PublicacaoDAO;
}