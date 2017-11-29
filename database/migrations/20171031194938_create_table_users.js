const adm = require('../../config/config.json').administrador;
const bcrypt = require('bcrypt-nodejs');
exports.up = function (knex, Promise) {
    return knex.schema.createTableIfNotExists('users', function (table) {
        table.increments();
        table.string('username', 50).notNullable();
        table.text('password').notNullable();
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
}
