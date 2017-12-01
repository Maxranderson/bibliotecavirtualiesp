Dependências utilizadas:

Express: Framework para o nodejs
Body-Parser: Analisa o conteúdo do request, extrai e o expõe dentro de request.Body
Consign: Utilizado para importar os modulos dentro de app
EJS: Motor de visualização que compila o código JS e gera um html
MYSQL: Utilizado para se conectar e usar o banco
Express-Session: Habilita o uso de sessão no Express
Passport: Utilizado para abstrair a authenticação
Passport-local: Estratégia utilizada pelo passport para authenticar por username e senha


Como configurar o projeto para desenvolvimento:


    1. Baixar e instalar o Node do link: https://nodejs.org/en/

    2. No terminal usar o comando: npm install

    3. Ir na pasta config, criar um arquivo chamado "localConfig.json", sem aspas,
    e copiar tudo que têm dentro de "config.json" para dentro dele

    4. No terminal usar o comando: node server.js




Como colocar em produção pela primeira vez:

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