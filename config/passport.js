var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');

module.exports = function(app, passport){
        var connection = mysql.createConnection(app.locals.variables.database.default);
        var User = app.models.User;

        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function(id, done) {
            User.findById(id,function(err,rows){	
                done(err, rows[0]);
            });
        });       
    
        passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            User.findByUsername(username ,function(err,results){
                if (err){
                    return done(err);
                }
                if (!results.length) {
                    return done(null, false, req.flash('loginMessage', 'Nome de usuário ou senha incorretos!')); // req.flash is the way to set flashdata using connect-flash
                }
                if (!( results[0].validarSenha(password))) {
                   return done(null, false, req.flash('loginMessage', 'Nome de usuário ou senha incorretos!')); // req.flash is the way to set flashdata using connect-flash
                }
                
                // all is well, return successful user
                return done(null, results[0]);			
            
            });
            
    
    
        }));
}