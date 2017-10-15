module.exports = function(app){

    var connectionConfig = app.factorys.connectionFactory;
    
    this.list = function(paginacao, callback){
        var connection = connectionConfig();
        connection.query('select count(*) as qt from publicacoes; ', function(erro, count){
            var connection = connectionConfig();
            var offset = paginacao.pageSize*(paginacao.currentPage-1);
            connection.query('select * from publicacoes limit ? offset ?',[paginacao.pageSize, offset],function(err, results){
                callback(err, results, count[0].qt);
            });
            connection.end();
        });
        connection.end();
    }
    
    this.insert = function(publicacao, callback){
        var connection = connectionConfig();
        connection.query('insert into publicacoes set ?', publicacao, callback);
        connection.end();
    }
    
    return this;
}