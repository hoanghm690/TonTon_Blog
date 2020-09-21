const md5 = require('md5');
const User = require('../models/User');

class UserController {
    register(req, res) {
        res.render('user/register');
    }
    login(req, res) {
        res.render('user/login');
    }
    signin(req, res) {
        const { username, password } = req.body;
        const hashedPassword = md5(password);
        User.findOne({ username: username }).then((savedUser) => {
            if (!savedUser) {
                res.render('user/login', {
                    errors: ['Người dùng không tồn tại!'],
                    values: req.body,
                });
                return;
            }
            if (savedUser.password !== hashedPassword) {
                res.render('user/login', {
                    errors: ['Mật khẩu không đúng!'],
                    values: req.body,
                });
                return;
            }
            res.cookie('userId', savedUser.id, { signed: true });
            res.redirect('/');
        });
    }
    signup(req, res) {
        const { username, password } = req.body;
        const hashedPassword = md5(password);
        const errors = [];
        if (!username) {
            errors.push('Vui lòng nhập tên!');
        }
        if (!password) {
            errors.push('Vui lòng nhập mật khẩu!');
        }
        if (errors.length) {
            res.render('user/register', {
                errors: errors,
                values: req.body,
            });
            return;
        }
        User.findOne({ username: username })
            .then((user) => {
                if (!user) {
                    User.create({
                        username: username,
                        password: hashedPassword,
                    }).then((user) => {
                        res.redirect('/user/login');
                    });
                } else {
                    res.render('user/register', {
                        errors: ['Người dùng này đã tồn tại'],
                        values: req.body,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = new UserController();
