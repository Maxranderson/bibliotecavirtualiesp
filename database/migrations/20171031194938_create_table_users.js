
exports.up = function (knex, Promise) {
    return knex.schema.createTableIfNotExists('users', function (table) {
        table.increments();
        table.string('username', 50).notNullable();
        table.text('password').notNullable();
    }).then(function(table){ knex(table).insert({username: 'teste', password: '12345'});});
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
}
