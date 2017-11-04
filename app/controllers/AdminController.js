module.exports = function (app) {

    this.index = function (req, res) {
        res.render('admin/index', {user: req.user});
    };

    return this;
}