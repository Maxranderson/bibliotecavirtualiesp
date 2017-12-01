
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('publicacoes', function(table){
    table.increments();
    table.text('titulo').notNullable();
    table.string('autor', 255).notNullable();
    table.string('tipo_publicacao', 20).notNullable();
    table.string('arquivo', 255);
    table.string('capa', 255);
    table.string('curso', 150);
    table.string('editora', 255);
    table.string('numero_edicao', 45);
    table.string('isbn_issn', 45);
    table.integer('ano_publicacao');
    table.string('pais_publicacao', 50);
    table.string('idioma', 30);
    table.string('instituicao', 100);
    table.text('sumario');
    table.text('referencias');
    table.text('palavras_chaves').notNullable();
    table.text('resumo_sinopse');
  });
};



exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('publicacoes');
};
