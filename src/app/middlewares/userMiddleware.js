const User = require('../models/User');
module.exports = function requireLogin(req, res, next) {
    if (!req.signedCookies.userId) {
        res.redirect('/user/login');
        return;
    }
    User.find({ _id: req.signedCookies.userId }).then((user) => {
        if (!user) {
            res.redirect('/user/login');
            return;
        }
        res.locals.user = user;
        next();
    });
};
