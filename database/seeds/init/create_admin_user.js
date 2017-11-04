const User = require('../../../app/models/User');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').select()
    .then(function (err, result) {
        User.create("admin", "testando_senh@", function(erro, results){
            console.log(results);
        });
    });
};
