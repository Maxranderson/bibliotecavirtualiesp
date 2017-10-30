module.exports = `
CREATE TABLE IF NOT EXISTS users
(
    id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username varchar(50) UNIQUE NOT NULL,
    password text NOT NULL
);

CREATE TABLE IF NOT EXISTS publicacoes
(
    id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    titulo text not NULL,
    autor varchar(255) not NULL,
    tipo_publicacao varchar(20) not NULL,
    arquivo varchar(255) NULL,
    capa varchar(255) NULL,
    organizador varchar(255) NULL,
    curso varchar(150) NULL,
    editora varchar(255) NULL,
    numero_edicao varchar(45) NULL,
    isbn_issn varchar(45) NULL,
    ano_publicacao smallint NULL,
    pais_publicacao varchar(50) NULL,
    idioma varchar(30) NULL,
    instituicao varchar(100) NULL,
    sumario text NULL,
    referencias text NULL,
    palavras_chaves text NULL,
    resumo_sinopse text NULL
);

`;