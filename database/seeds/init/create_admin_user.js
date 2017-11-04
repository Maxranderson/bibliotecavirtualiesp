const bcrypt = require('bcrypt-nodejs');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "admin", password: bcrypt.hashSync("testando_senh@", bcrypt.genSaltSync(8), null)}
      ]);
    });
};
