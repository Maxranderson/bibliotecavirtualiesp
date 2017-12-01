module.exports = function(app){

    function Mensagem(){
        this.danger = [];
        this.success = [];
        this.info = [];
        this.warning = [];
    }

    Mensagem.prototype.addError = function(error){
        if(error.length){
            if(error instanceof Array){
                this.danger = this.danger.concat(error);
            }else{
                this.danger.push(error);
            }
        }
    };

    Mensagem.prototype.addSuccess = function(success){
        if(success.length){
            if(typeof success === typeof []){
                this.success = this.success.concat(success);
            }else{
                this.success.push(success);
            }
        }
    };

    return Mensagem;
};