module.exports = function userValidate(req, res, next) {
    const { username, password , avatar } = req.body;
    const errors = [];
    if (!username) {
        errors.push('Vui lòng nhập tên của bạn');     
    }
    if (!password) {
        errors.push('Vui lòng nhập mật khẩu của bạn');
    }
    if (errors.length) {
        res.render('user/register', {
            errors: errors,
            values: req.body,
        });
        return;
    }
    res.locals.success = true;
    next();
};
