module.exports = function(app){
    
        var knex = app.factorys.connectionFactory();
        
        this.list = function(paginacao, callback){

            knex('users').count('* as qt').asCallback(function (erro, count) {

                var offset = paginacao.pageSize * (paginacao.currentPage - 1);
                knex('users').select().limit(paginacao.size).offset(offset).asCallback(function (err, results) {

                    callback(err, results, count[0].qt);

                });

            });
        }
        
        this.insert = function(user, callback){
            knex('users').insert(user).asCallback(callback);
        }

        this.delete = function(user,callback){

            knex('users').del().where({id: user.id}).asCallback(callback);
        }

        this.update = function(user, callback){

            knex('users').where({id: user.id}).update({password: user.password}).asCallback(callback);
        }

        this.findById = function(id, callback){
            // var connection = connectionConfig();
            // connection.query('select * from users where id = ?',[id], callback);
            // connection.end();

            knex('users').select().where({id: id}).asCallback(callback);
        }

        this.findByUsername = function(username, callback){
            // var connection = connectionConfig();
            // connection.query('select * from users where username = ?',[username], callback);
            // connection.end();
            knex('users').select().where({username: username}).asCallback(callback);
        }

        return this;
    }