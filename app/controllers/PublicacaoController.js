module.exports = function (app) {

    const Publicacao = app.models.Publicacao;
    const Mensagem = app.models.Mensagem;
    const fs = require('fs');

    this.lista = function (req, res) {

        var paginacao = {
            currentPage: req.query.page || 1,
            pageCount: 1,
            pageSize: 10
        };
        Publicacao.list(paginacao, function (erro, results, count) {
            var msgm = new Mensagem();
            var publicacoes = [{}];

            msgm.addError(req.flash('dangerMessage'));
            msgm.addSuccess(req.flash('successMessage'));

            if (erro) {
                msgm.addError(erro);
                console.error(erro);
            }
            if(results.length){
                publicacoes = results;
            }
            paginacao.pageCount = Math.ceil(count/paginacao.pageSize);
            res.render('admin/publicacao/lista', { paginacao: paginacao, publicacoes: publicacoes, mensagem: msgm, downloadPath: (app.locals.variables.downloadPath+'publicacoes/') });
        });

    };

    this.form = function (req, res) {
        var msgm = new Mensagem();
        msgm.addError(req.flash('dangerMessage'));
        msgm.addSuccess(req.flash('successMessage'));

        res.render('admin/publicacao/form', { mensagem: msgm, publicacao:{} });

    };

    //TODO: Validar os dados do formulário
    this.cadastra = function (req, res) {
        var files = req.files;

        saveFiles([],files, function(erros) {
            if (erros.length) {
                req.flash('dangerMessage', erros);
                res.redirect('/admin/publicacoes/cadastrar');
                return;
            }

            if(files['arquivo']) req.body.arquivo = files['arquivo'][0].filename+'.pdf';
            if(files['capa']) req.body.capa = files['capa'][0].filename+(files['capa'][0].originalname.substring(req.files['capa'][0].originalname.length - 5, files['capa'][0].originalname.length));

            var publicacao = req.body;
            var keys = Object.keys(publicacao);
            for(var i = 0;i<keys.length;i++) if(!publicacao[keys[i]]) delete publicacao[keys[i]];

            Publicacao.insert(req.body, function (erro, result) {
                if (erro) {
                    console.log(erro);
                    req.flash('dangerMessage', erro);
                } else {
                    req.flash('successMessage', app.locals.variables.mensagem.publicacao.sucesso);
                }
                res.redirect('/admin/publicacoes/cadastrar');
            });
        });
    };

    //TODO: Validar extensão dos arquivos
    this.upload = function(err,req,res,next){
        console.error(err);
        next();
    };

    this.downloadFile = function(req, res){
        var filename = req.params.nome;
        res.download(app.locals.variables.downloadPath+"publicacoes/"+filename);
    };

    this.downloadImage = function(req, res){
        var filename = req.params.nome;
        res.download(app.locals.variables.downloadPath+"capas/"+filename);
    };

    this.alteraForm = function(req, res){
        Publicacao.findById({id: req.params.id}, function(err, results){
            var msgm = new Mensagem();
            var publicacao = {};
            if(err) msgm.addError(err);
            if(!results.length){
                msgm.addError(app.locals.variables.mensagem.publicacao.naoEncontrado);
            }else{
                publicacao = results[0];
            }
            res.render('admin/publicacao/form', {mensagem:msgm, publicacao:publicacao});

        });
    };

    this.alterar = function (req, res) {
        var publicacao = req.body;
        var id = publicacao.id;
        var keys = Object.keys(publicacao);
        for(var i = 0;i<keys.length;i++) if(!publicacao[keys[i]]) delete publicacao[keys[i]];

        saveFiles([], res.files, function(erros) {
            if(erros.length){
                req.flash('dangerMessage', erros);
                res.redirect('/admin/publicacoes');
            }
            Publicacao.update(publicacao, function(err, results){
                if(err){
                    req.flash('dangerMessage', err);
                }else{
                    req.flash('successMessage', app.locals.variables.mensagem.publicacao.sucessoAlterado);
                }
                res.redirect('/admin/publicacoes');
            });
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

    function savePublicacaoFile(erros, publicacaoFile, callback){
        var filename = publicacaoFile.filename+'.pdf';
        var file = app.locals.variables.downloadPath+'publicacoes/'+filename;
        fs.createReadStream(publicacaoFile.path)
            .pipe(fs.createWriteStream(file))
            .on('finish', function(){
                fs.unlink(publicacaoFile.path);
                callback(erros);
            }).on('error', function(writeErr){
                fs.unlink(publicacaoFile.path);
                console.error(writeErr);
                callback(erros)
            });
    }

    function saveCapaFile(erros, capaFile, callback){
        var filenameCapa = capaFile.filename+(capaFile.originalname.substring(capaFile.originalname.length - 5, capaFile.originalname.length));
        var fileCapa = app.locals.variables.downloadPath+'capas/'+filenameCapa;
        fs.createReadStream(capaFile.path)
            .pipe(fs.createWriteStream(fileCapa))
            .on('finish', function(){
                fs.unlink(capaFile.path);
                callback(erros);
            }).on('error', function(writeErr){
                fs.unlink(capaFile.path);
                console.error(writeErr);
                callback(erros);
            });
    }

    function saveFiles(erros, files, callback){
        if(files){
            if(files['arquivo']){
                savePublicacaoFile(erros, files['arquivo'][0], function(err){
                    if(files['capa']){
                        saveCapaFile(err, files['capa'][0], callback);
                    }else{
                        callback(erros);
                    }
                });
            }
        }
    }

    return this;
}