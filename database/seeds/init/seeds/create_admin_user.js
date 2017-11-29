const adm = require('../../../../config/config.json').administrador;
const bcrypt = require('bcrypt-nodejs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').insert([
      {username: adm.username, password: bcrypt.hashSync(adm.senha, bcrypt.genSaltSync(8), null)}
    ]);
};
