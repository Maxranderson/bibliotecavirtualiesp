module.exports = function(app){
    var UserDAO = app.dao.UserDAO;
    var bcrypt = require('bcrypt-nodejs');
    function User(obj){
        this.id = obj.id;
        this.username = obj.username;
        this.password = obj.password;
    }

    User.prototype.save = function(){
        if(this.id){
            UserDAO.update(this);
            return;
        }
        UserDAO.insert(this, function(err, results){
            if(err){
                console.log(err);
                throw err;
            }           
        });
    }

    User.list = function(paginacao, callback){
        UserDAO.list(paginacao, callback);
    }

    User.gerarHash = function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }

    User.prototype.validarSenha = function(password){
        return bcrypt.compareSync(password, this.password);
    }

    User.create = function(username, password, callback){
        User.findByUsername(username, function(err, results){
            if(!results.length){
                var user = {username: username, password: User.gerarHash(password)}
                UserDAO.insert(user, callback);
            }else{
                callback("Usuário Já existe", null);
            }
        });
    }

    User.findById = function(id, callback){
        UserDAO.findById(id, function(err, results){
            if(results[0]){
                var user = new User(results[0]);
                results[0] = user;        
                callback(err, results);
            }
        });
    }

    User.findByUsername = function(username, callback){
        UserDAO.findByUsername(username, function(err, results){
            if(err) callback(err, results);
            if(results[0]){
                var user = new User(results[0]);
                results[0] = user;     
                callback(err, results);
                return;
            }
            callback(err, results);
        });
    }

    return User;
}