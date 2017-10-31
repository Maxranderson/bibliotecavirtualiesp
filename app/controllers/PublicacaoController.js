module.exports = function (app) {

    var Publicacao = app.models.Publicacao;
    const fs = require('fs');
    var count = 0;

    this.lista = function (req, res) {

        var paginacao = {
            currentPage: req.query.page || 1,
            pageCount: 1,
            pageSize: 10,
        }
        var msgm = {}
        var danger = req.flash('dangerMessage');
        var success = req.flash('successMessage');
        if (danger.length) msgm.danger = danger;
        if (success.length) msgm.success = success;
        Publicacao.list(paginacao, function (erro, results, count) {
            if (erro) {
                console.log(erro);
                res.render('admin/publicacao/lista', { paginacao: paginacao, publicacoes: {}, mensagem: { danger: erro } })
            }
            paginacao.pageCount = Math.ceil(count/paginacao.pageSize);
            res.render('admin/publicacao/lista', { paginacao: paginacao, publicacoes: results, mensagem: msgm, downloadPath: (app.locals.variables.downloadPath+'publicacoes/') });
        });

    };

    this.form = function (req, res) {

        var msgm = {}
        var danger = req.flash('dangerMessage');
        var success = req.flash('successMessage');
        if (danger.length) msgm.danger = danger;
        if (success.length) msgm.success = success;
        res.render('admin/publicacao/form', { mensagem: msgm, publicacao:{} });

    };

    //TODO: Validar extensão dos arquivos
    this.upload = function(req,res,next){
        next();
    }
    //TODO: Validar os dados do formulário
    this.cadastra = function (req, res) {

        var publicacao = req.body;
        if(publicacao.arquivo) delete publicacao.arquivo;
        var keys = Object.keys(publicacao);
        for(var i = 0;i<keys.length;i++) if(!publicacao[keys[i]]) delete publicacao[keys[i]];

        Publicacao.insert(req.body, function (erro, result) {
            if (erro) {
                console.log(erro);
                req.flash('dangerMessage', erro);
            } else {
                req.flash('successMessage', app.locals.variables.mensagem.publicacao.sucesso);
            }
            saveFiles(req.files, result.insertId);
            res.redirect('/admin/publicacoes/cadastrar');
        });

    };

    this.downloadFile = function(req, res){
        var filename = req.params.nome;
        res.download(app.locals.variables.downloadPath+"publicacoes/"+filename);
    }

    this.downloadImage = function(req, res){
        var filename = req.params.nome;
        res.download(app.locals.variables.downloadPath+"capas/"+filename);
    }

    this.alteraForm = function(req, res){
        Publicacao.findById({id: req.params.id}, function(err, results){
            var msgm = {};
            var publicacao = {};
            if(err) msgm.danger = err;
            if(!results.length){
                msgm.danger = app.locals.variables.mensagem.publicacao.naoEncontrado;
            }else{
                publicacao = results[0];
            }
            res.render('admin/publicacao/form', {mensagem:msgm, publicacao:publicacao});

        });
    };

    this.alterar = function (req, res) {
        var publicacao = req.body;
        var keys = Object.keys(publicacao);
        for(var i = 0;i<keys.length;i++) if(!publicacao[keys[i]]) delete publicacao[keys[i]];

        Publicacao.update(req.body, function(err, results){
            if(err){
                req.flash('dangerMessage', err.message);
            }else{
                saveFiles(req.files, req.body.id);
                req.flash('successMessage', app.locals.variables.mensagem.publicacao.sucessoAlterado);
            }
            res.redirect('/admin/publicacoes');
        });

    };

    this.deletar = function (req, res) {

        Publicacao.delete({id: req.body.id}, function(err, results){
            if(err){
                req.flash('dangerMessage', err);
            }else{
                req.flash('successMessage', app.locals.variables.mensagem.publicacao.sucessoDeletado);
            }
            res.redirect('/admin/publicacoes');
        });

    };

    function saveFiles(files, id){
        if(files && id){
            if(files['arquivo']){
                var filename = 'publicacaoId'+id+'.pdf';
                var file = app.locals.variables.downloadPath+'publicacoes/'+filename;
                fs.createReadStream(files['arquivo'][0].path).pipe(fs.createWriteStream(file)).on('finish', function(writeErr){
                    if(writeErr) console.log(writeErr);
                    Publicacao.update({id: id, arquivo: filename}, function(err, result){
                        if(err) console.log(err);
                        fs.unlink(files['arquivo'][0].path, function(error){
                            if(error) console.log(error);
                        });
                    });
                });
            }
            if(files['capa']){
                var filenameCapa = 'capaId'+id+'.jpg';
                var fileCapa = app.locals.variables.downloadPath+'capas/'+filenameCapa;
                fs.createReadStream(files['capa'][0].path).pipe(fs.createWriteStream(fileCapa)).on('finish', function(writeErr){
                    if(writeErr) console.log(writeErr);
                    Publicacao.update({id: id, capa: filenameCapa}, function(err, result){
                        if(err) console.log(err);
                        fs.unlink(files['capa'][0].path, function(error){
                            if(error) console.log(error);
                        });
                    });
                });
            }

        }else{
            throw new Error('Arquivo ou ID não foi informado');
        }
    }

    return this;
}