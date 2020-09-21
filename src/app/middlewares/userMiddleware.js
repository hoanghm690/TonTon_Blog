const User = require('../models/User');
module.exports = function requireLogin(req, res, next) {
    if (!req.cookies.userId) {
        res.redirect('/user/login');
        return;
    }
    User.find({ _id: req.cookies.userId })
        .then(() => {
            res.redirect('/user/login');
        })
        .catch(next);
};
