module.exports = function(app){
    
        var connectionConfig = app.factorys.connectionFactory;
        
        this.list = function(paginacao, callback){
            var connection = connectionConfig();
            var offset = paginacao.pageSize*(paginacao.currentPage-1);
            connection.query('select count(*) as qt from users; ', function(erro, count){
                var connection = connectionConfig();
                connection.query('select * from users limit ? offset ?',[paginacao.pageSize, offset],function(err, results){
                    callback(err, results, count[0].qt);
                });
                connection.end();
            });
            connection.end();
        }
        
        this.insert = function(user, callback){
            var connection = connectionConfig();
            connection.query('insert into users set ?', user, callback);
            connection.end();
        }

        this.update = function(user, callback){
            var connection = connectionConfig();
            connection.query('update users set password= ? where id = ?', [user.password, user.id], callback);
            connection.end();
        }

        this.findById = function(id, callback){
            var connection = connectionConfig();
            connection.query('select * from users where id = ?',[id], callback);
            connection.end();
        }

        this.findByUsername = function(username, callback){
            var connection = connectionConfig();
            connection.query('select * from users where username = ?',[username], callback);
            connection.end();
        }
        
        return this;
    }