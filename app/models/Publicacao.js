module.exports = function (app) {

    const PublicacaoDAO = app.dao.PublicacaoDAO;
    const { body, oneOf } = require('express-validator/check');

    function Publicacao() {
    }

    Publicacao.list = function (paginacao, callback) {
        PublicacaoDAO.list(paginacao, callback);
    }

    Publicacao.insert = function (publicacao, callback) {
        PublicacaoDAO.insert(publicacao, callback);
    }

    Publicacao.findById = function (publicacao, callback) {

        PublicacaoDAO.findById(publicacao, callback);
        
    }

    Publicacao.update = function (publicacao, callback) {

        PublicacaoDAO.update(publicacao, callback);

    }

    Publicacao.delete = function (publicacao, callback) {

        PublicacaoDAO.delete(publicacao, callback);

    }

    Publicacao.lastFour = function(callback){
        PublicacaoDAO.lastFour(callback);
    }

    Publicacao.listWithSearch = function(search, paginacao, callback){
        PublicacaoDAO.listWithSearch(search, paginacao, callback);
    }

    Publicacao.validationRules = [
        body('titulo').isLength({
            min: 1
        }).withMessage('Título deve ser preenchido.'),
        body('autor').isLength({
            min: 1,
            max: 255
        }).withMessage('Autor deve ser preenchido e no máximo 255 caracteres.'),
        body('tipo_publicacao').isIn(['Artigo', 'Dissertação', 'Fascículo', 'Livro', 'Monografia', 'Plano de Aula', 'Revista', 'Tese']),
        body('palavras_chaves').isLength({
            min: 1
        }).withMessage('Palavras-chave deve conter no mínimo uma palavra.'),
        body('curso').isLength({
            max: 150
        }).withMessage('Curso deve ter no máximo 150 caracteres.'),
        body('editora').isLength({
            max: 255
        }).withMessage('Editora deve ter no máximo 255 caracteres.'),
        body('numero_edicao').isLength({
            max: 45
        }).withMessage('Numero de edição deve ter no máximo 45 caracteres.'),
        body('idioma').isLength({
            max: 30
        }).withMessage('Idioma deve ter no máximo 30 caracteres.'),
        body('pais_publicacao').isLength({
            max: 50
        }).withMessage('País da publicação deve ter no máximo 50 caracteres.'),
        oneOf([
            body('ano_publicacao').isInt({
                min: 1900,
                max: (new Date().getFullYear())
            }).withMessage('Ano da publicação deve estar no formato yyyy e não pode ultrapassar o ano atual.'),
            body('ano_publicacao').isEmpty()
        ]),
        body('instituicao').isLength({
            max: 100
        }).withMessage('Instituição deve ter no máximo 100 caracteres.'),
        body('sumario'),
        body('referencias'),
        body('isbn_issn').isLength({
            max: 45
        }).withMessage('ISBN/ISSN deve ter no máximo 45 caracteres.')
    ];

    return Publicacao;
}