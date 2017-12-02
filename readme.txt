Requisitos:

    NodeJS versão 6 e um banco MYSQL ou POSTGRES

Como colocar rodar o app pela primeira vez:

    Configurar o projeto o arquivo "config.json" na pasta config,
    mudando essas chaves:

    "client" : "pg" ou "mysql",
    "host" : "192.1.1.1" IP do banco,
    "user" : "root" usuário do banco,
    "password" : "" senha do usuário do banco,
    "database" : "" nome do banco,
    "porta" : "80" porta onde vai rodar o server,
    "username" : "admin" nome da primeira conta disponível,
    "senha" : "12345" senha da primeira conta disponível

    Depois rodar esses comandos na sequencia:

        1. git clone https://bitbucket.org/Maxranderson/bibliotecavirtualiesp.git

        2. npm install

        3. ./node_modules/.bin/knex migrate:latest --cwd ./database --env production

        4. ./node_modules/.bin/knex seed:run --cwd ./database/seeds/init/ --env production

        5. Renomear .envExample para .env

        Para enfim, rodar o servidor, temos 2 opções:

            Para rodar com recuperação de erros simples, ou seja, o processo sempre é reiniciado depois de um crash
                1. node cluster

            Para rodar normal
                2. node server