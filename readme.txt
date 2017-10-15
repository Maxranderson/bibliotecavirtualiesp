Dependências utilizadas:

Express: Framework para o nodejs
Body-Parser: Analisa o conteúdo do request, extrai e o expõe dentro de request.Body
Consign: Utilizado para importar os modulos dentro de app
EJS: Motor de visualização que compila o código JS e gera um html
MYSQL: Utilizado para se conectar e usar o banco
Express-Session: Habilita o uso de sessão no Express
Passport: Utilizado para abstrair a authenticação
Passport-local: Estratégia utilizada pelo passport para authenticar por username e senha


Como configurar o projeto:


1. Baixar e instalar o Node do link: https://nodejs.org/en/

2. No terminal usar o comando: npm install

3. Ir na pasta config, criar um arquivo chamado "localConfig.json", sem aspas, 
e copiar tudo que têm dentro de "config.json" para dentro dele

4. No terminal usar o comando: node server.js