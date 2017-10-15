module.exports = function(app){
    function Teste(){

    }
    Teste.prototype.funcaoprot = function(){
        console.log("Método");
    }
    Teste.funcao = function(){
        console.log("Função estática");
    }
    return Teste;
}