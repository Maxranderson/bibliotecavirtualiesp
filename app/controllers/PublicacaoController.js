module.exports = function (app) {

    const Publicacao = app.models.Publicacao;
    const Mensagem = app.models.Mensagem;
    const fs = require('fs');
    const {validationResult} = require('express-validator/check');

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
            if (results.length) {
                publicacoes = results;
            }
            paginacao.pageCount = Math.ceil(count / paginacao.pageSize);
            res.render('admin/publicacao/lista', {
                paginacao: paginacao,
                publicacoes: publicacoes,
                mensagem: msgm,
                downloadPath: (app.locals.variables.downloadPath + 'publicacoes/')
            });
        });

    };

    this.form = function (req, res) {
        var msgm = new Mensagem();
        msgm.addError(req.flash('dangerMessage'));
        msgm.addSuccess(req.flash('successMessage'));
        res.render('admin/publicacao/form', {mensagem: msgm, publicacao: {}});

    };
    this.cadastraError = function (multErr, req, res, next) {
        if (multErr) {
            console.error(multErr);
            req.flash('dangerMessage', multErr.message);
            res.redirect('/admin/publicacoes/cadastrar');
            return;
        } else next();
    };

    this.cadastra = function (req, res) {
        var files = req.files;

        saveFiles([], files, function (erros) {
            if (erros.length) {
                req.flash('dangerMessage', erros);
                res.redirect('/admin/publicacoes/cadastrar');
                return;
            }

            if (files['arquivo']) req.body.arquivo = files['arquivo'][0].filename + '.pdf';
            if (files['capa']) {
                var split = files['capa'][0].originalname.split(".");
                var ext = "." + split[split.length - 1];
                req.body.capa = files['capa'][0].filename + (ext);
            }

            var publicacao = req.body;
            var keys = Object.keys(publicacao);
            for (var i = 0; i < keys.length; i++) if (!publicacao[keys[i]]) delete publicacao[keys[i]];

            Publicacao.insert(req.body, function (erro, result) {
                if (erro) {
                    console.error(erro);
                    req.flash('dangerMessage', erro.message);
                } else {
                    req.flash('successMessage', app.locals.variables.mensagem.publicacao.sucesso);
                }
                res.redirect('/admin/publicacoes/cadastrar');
            });
        });
    };

    this.fileFilter = function (req, file, cb) {
        if (file.fieldname == 'arquivo')
            if (file.mimetype === 'application/pdf')
                cb(null, true);
            else
                cb(new Error("O arquivo deve estar no formato PDF"));

        if (file.fieldname == 'capa')
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
                cb(null, true);
            else
                cb(new Error("A capa deve estar no formato JPEG ou PNG"));
    };

    this.downloadFile = function (req, res) {
        var filename = req.params.nome;
        res.download(app.locals.variables.downloadPath + "publicacoes/" + filename);
    };

    this.downloadImage = function (req, res) {
        var filename = req.params.nome;
        res.download(app.locals.variables.downloadPath + "capas/" + filename);
    };

    this.alteraForm = function (req, res) {
        Publicacao.findById({id: req.params.id}, function (err, results) {
            var msgm = new Mensagem();
            var publicacao = {};
            msgm.addError(req.flash('dangerMessage'));
            if (err) {
                console.error(err);
                msgm.addError(err.message);
            }
            if (!results.length) {
                msgm.addError(app.locals.variables.mensagem.publicacao.naoEncontrado);
            } else {
                publicacao = results[0];
            }
            res.render('admin/publicacao/form', {mensagem: msgm, publicacao: publicacao});

        });
    };
    this.alterarError = function (multErr, req, res, next) {
        if (multErr) {
            console.error(multErr);
            req.flash('dangerMessage', multErr.message);
            res.redirect('/admin/publicacoes/alterar/' + req.body.id);
            return;
        } else next();
    }

    this.alterar = function (req, res) {
        var files = req.files;

        saveFiles([], files, function (erros) {
            if (erros.length) {
                req.flash('dangerMessage', erros);
                res.redirect('/admin/publicacoes/cadastrar');
                return;
            }
            if(files['arquivo'] || files['capa']){
                Publicacao.findById({id: req.body.id}, function(err, results){
                    if(err){
                        console.error(err);
                        req.flash('dangerMessage', err.message);
                        res.redirect('/admin/publicacoes/alterar/'+req.body.id);
                    }
                    if (files['arquivo']){

                        if(results[0].arquivo && arquivoFileExists(results[0].arquivo)) deleteArquivo(results[0].arquivo);

                        req.body.arquivo = files['arquivo'][0].filename + '.pdf';
                    }
                    if (files['capa']) {

                        if(results[0].capa && capaFileExists(results[0].capa)) deleteCapa(results[0].capa);

                        var split = files['capa'][0].originalname.split(".");
                        var ext = "." + split[split.length - 1];
                        req.body.capa = files['capa'][0].filename + (ext);
                    }
                    continua();
                });
            }else continua();

            function continua(){

                var publicacao = req.body;
                var keys = Object.keys(publicacao);
                for (var i = 0; i < keys.length; i++) if (!publicacao[keys[i]]) delete publicacao[keys[i]];

                Publicacao.update(publicacao, function (err, results) {
                    if (err) {
                        console.error(err);
                        req.flash('dangerMessage', err.message);
                    } else {
                        req.flash('successMessage', app.locals.variables.mensagem.publicacao.sucessoAlterado);
                    }
                    res.redirect('/admin/publicacoes');
                });
            }
        });
    };

    this.deletar = function (req, res) {

        Publicacao.delete({id: req.body.id}, function (err, results) {
            if (err) {
                console.error(err);
                req.flash('dangerMessage', err.message);
            } else {
                req.flash('successMessage', app.locals.variables.mensagem.publicacao.sucessoDeletado);
            }
            res.redirect('/admin/publicacoes');
        });

    };

    function savePublicacaoFile(erros, publicacaoFile, callback) {
        var filename = publicacaoFile.filename + '.pdf';
        var file = app.locals.variables.downloadPath + 'publicacoes/' + filename;
        fs.createReadStream(publicacaoFile.path)
            .pipe(fs.createWriteStream(file))
            .on('finish', function () {
                fs.unlink(publicacaoFile.path);
                callback(erros);
            }).on('error', function (writeErr) {
            fs.unlink(publicacaoFile.path);
            console.error(writeErr);
            erros.push(writeErr.message);
            callback(erros)
        });
    }

    function saveCapaFile(erros, capaFile, callback) {
        const array = capaFile.originalname.split(".");
        const ext = "." + array[array.length - 1];
        var filenameCapa = capaFile.filename + ext;
        var fileCapa = app.locals.variables.downloadPath + 'capas/' + filenameCapa;
        fs.createReadStream(capaFile.path)
            .pipe(fs.createWriteStream(fileCapa))
            .on('finish', function () {
                fs.unlink(capaFile.path);
                callback(erros);
            }).on('error', function (writeErr) {
            fs.unlink(capaFile.path);
            console.error(writeErr);
            erros.push(writeErr.message);
            callback(erros);
        });
    }

    function saveFiles(erros, files, callback) {
        if (files) {
            if (files['arquivo']) {
                savePublicacaoFile(erros, files['arquivo'][0], function (err) {
                    if (files['capa']) {
                        saveCapaFile(err, files['capa'][0], callback);
                    } else {
                        callback(erros);
                    }
                });
            } else{
                if (files['capa']) {
                    saveCapaFile(erros, files['capa'][0], callback);
                } else {
                    callback(erros);
                }
            }
        } else callback(erros);
    }

    this.validarCadastra = function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            var errMsgs = [];
            for(var i = 0; i<errors.array().length; i++){
                errMsgs.push(errors.array()[i].msg);
            }
            if(!req.files['arquivo']){
                errMsgs.push('O PDF da publicação deve ser anexado.');
            }
            req.flash('dangerMessage', errMsgs);
            return res.redirect('/admin/publicacoes/cadastrar/');
        }
        next();
    };

    this.validarAlterar = function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            var errMsgs = [];
            for(var i = 0; i<errors.array().length; i++){
                errMsgs.push(errors.array()[i].msg);
            }
            req.flash('dangerMessage', errMsgs);
            return res.redirect('/admin/publicacoes/alterar/'+req.body.id);
        }
        next()
    };

    function deleteArquivo(name){
        fs.unlink(app.locals.variables.downloadPath + 'publicacoes/' + name);
    }

    function deleteCapa(name){
        fs.unlink(app.locals.variables.downloadPath + 'capas/' + name);
    }

    function arquivoFileExists(name){
        return fs.existsSync(app.locals.variables.downloadPath + 'publicacoes/' + name);
    }

    function capaFileExists(name){
        return fs.existsSync(app.locals.variables.downloadPath + 'capas/' + name);
    }

    this.formValidationRules = Publicacao.validationRules;

    return this;
};