module.exports = function (app) {

    const knex = app.factorys.connectionFactory();

    this.list = function (paginacao, callback) {
        knex('publicacoes').count('* as qt').asCallback(function (erro, count) {
            var offset = paginacao.pageSize * (paginacao.currentPage - 1);
            knex('publicacoes').select().limit(parseInt(paginacao.pageSize)).offset(offset).asCallback(function (err, results) {
                callback(err, results, count[0].qt);
            });
        });
    };

    this.insert = function (publicacao, callback) {
        knex('publicacoes').insert(publicacao).asCallback(callback);
    };

    this.update = function (publicacao, callback) {

        var id = publicacao.id;

        delete publicacao.id;

        knex('publicacoes').where({id: id}).update(publicacao).asCallback(callback);
    }

    this.delete = function (publicacao, callback) {

        knex('publicacoes').del().where({id: publicacao.id}).asCallback(callback);
    }

    this.findById = function (publicacao, callback) {

        knex('publicacoes').select().where({id: publicacao.id}).asCallback(callback);
    }

    this.lastFour = function (callback) {

        knex('publicacoes').select().limit(4).orderBy('id', 'desc').asCallback(callback);
    }

    return this;
}