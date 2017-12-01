module.exports = function(app){

    this.applyPublicacaoFilters = function(searchObj, knex){
        if(searchObj.simpleFilter){
            knex.where("palavras_chaves", "like", "%"+searchObj.simpleFilter+"%")
        }else{

        }
        return knex;
    }

    this.newFilterFromSimpleSearch = function(query){
        var search = {}
        if(query.keyWord){
            search.simpleFilter = query.keyWord;
        }
        return search;
    }

    this.newFilterFromAdvancedSearch = function(body){

    }

    return this;
}