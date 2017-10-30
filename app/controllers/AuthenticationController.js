module.exports = function(app){

    this.login = function(req, res){
        res.render('login', {loginMessage: req.flash('loginMessage')});
    }

    this.logar = function(req, res){
        console.log("logou");
        res.redirect('/admin');
    }

    this.logout = function(req, res){
        req.logout();
        res.redirect('/login');
    }

    this.estaLogado = function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('loginMessage','Não está logado!');
        res.redirect('/login');
    }


    return this;
}