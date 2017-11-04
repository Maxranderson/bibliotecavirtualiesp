// Update with your config settings.
function testDevelopment(){
  try{
    require('../config/localConfig.json');
    return true;
  }catch(e){
    return false;
  }
}

var development = (testDevelopment() ? require('../config/localConfig.json').database : {});
const production = require('../config/config.json').database;
module.exports = {

  development: {
    client: development.client,
    connection: development.default,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: production.client,
    connection: production.default,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
