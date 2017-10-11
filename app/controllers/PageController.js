module.exports = function(app){
        this.index = function (req, res) {
                res.render("index");
        };
        this.index2 = function(req, res){
                res.render("index2");
        };

        return this;
}