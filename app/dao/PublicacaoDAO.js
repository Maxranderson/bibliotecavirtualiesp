function PublicacaoDAO(){
    this._connectionConfig = require('../factorys/connectionFactory')();
}

PublicacaoDAO.prototype.list = function(callback){
    var connection = this._connectionConfig();
    connection.query('select * from publicacoes',callback);
    connection.end();
}

PublicacaoDAO.prototype.insert = function(publicacao, callback){
    var connection = this._connectionConfig();
    connection.query('insert into publicacoes set ?', publicacao, callback);
    connection.end();
}

module.exports = function(){
    return PublicacaoDAO;
}