module.exports = function checkUser(req, res, next) {
    const { role } = res.locals.user;
    if (role >= 0) {
        next();
    } else {
        res.redirect('/error');
    }
};
