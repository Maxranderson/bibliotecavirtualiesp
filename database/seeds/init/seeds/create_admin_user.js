const bcrypt = require('bcrypt-nodejs');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').insert([
      {username: "admin", password: bcrypt.hashSync("testando_senh@", bcrypt.genSaltSync(8), null)}
    ]);
};
