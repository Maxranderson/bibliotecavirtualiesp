module.exports = function(app){

    this.applyPublicacaoFilters = function(searchObj, knx){
        var quantFilter = 0;
        var knex = knx
        if(searchObj.simpleFilter) knex = knex.where("palavras_chaves", "like", "%"+searchObj.simpleFilter+"%");
        if(searchObj.titulo) applyWhereOrAndWhere("titulo", "like", "%"+searchObj.titulo+"%");
        if(searchObj.autor) applyWhereOrAndWhere("autor", "like", "%"+searchObj.autor+"%");
        if(searchObj.palavras_chaves) applyWhereOrAndWhere("palavras_chaves", "like", "%"+searchObj.palavras_chaves+"%");
        if(searchObj.tipo_publicacao) applyWhereOrAndWhere("tipo_publicacao", "like", "%"+searchObj.tipo_publicacao+"%");
        if(searchObj.curso) applyWhereOrAndWhere("curso", "like", "%"+searchObj.curso+"%");
        if(searchObj.editora) applyWhereOrAndWhere("editora", "like", "%"+searchObj.editora+"%");
        if(searchObj.numero_edicao) applyWhereOrAndWhere("numero_edicao", "like", "%"+searchObj.numero_edicao+"%");
        if(searchObj.isbn_issn) applyWhereOrAndWhere("isbn_issn", "like", "%"+searchObj.isbn_issn+"%");
        if(searchObj.idioma) applyWhereOrAndWhere("idioma", "like", "%"+searchObj.idioma+"%");
        if(searchObj.ano_publicacao) applyWhereOrAndWhere("ano_publicacao", "=", searchObj.ano_publicacao);
        if(searchObj.instituicao) applyWhereOrAndWhere("instituicao", "like", "%"+searchObj.instituicao+"%");

        function applyWhereOrAndWhere(p1, p2, p3){
            quantFilter++;
            if(quantFilter < 2) knex = knex.where(p1, p2, p3); else knex.andWhere(p1, p2, p3);
        }
        return knex;
    }

    this.filterSearch = function(obj){
        var search = {}
        if(obj.keyWord) search.simpleFilter = obj.keyWord;
        if(obj.titulo) search.titulo = obj.titulo;
        if(obj.autor) search.autor = obj.autor;
        if(obj.palavras_chaves) search.palavras_chaves = obj.palavras_chaves;
        if(obj.tipo_publicacao && obj.tipo_publicacao != 'Qualquer') search.tipo_publicacao = obj.tipo_publicacao;
        if(obj.curso) search.curso = obj.curso;
        if(obj.editora) search.editora = obj.editora;
        if(obj.numero_edicao) search.numero_edicao = obj.numero_edicao;
        if(obj.isbn_issn) search.isbn_issn = obj.isbn_issn;
        if(obj.idioma) search.idioma = obj.idioma;
        if(obj.ano_publicacao) search.ano_publicacao = obj.ano_publicacao;
        if(obj.instituicao) search.instituicao = obj.instituicao;
        return search;
    }



    return this;
}