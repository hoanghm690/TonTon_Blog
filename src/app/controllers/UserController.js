const md5 = require('md5');
const User = require('../models/User');
const logout = require('express-passport-logout');
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
        const avatar = (req.body.avatar = req.file.path
            .split('\\')
            .slice(-2)
            .join('/'));
        const hashedPassword = md5(password);
        User.findOne({ username: username })
            .then((user) => {
                if (!user) {
                    User.create({
                        username: username,
                        password: hashedPassword,
                        avatar: avatar,
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
    logout(req, res) {
        logout();
        res.clearCookie('userId');
        res.redirect('/');
    }
    settings(req, res) {
        res.render('user/settings');
    }
    accountsShow(req, res, next) {
        User.find({})
            .then((user) => {
                res.render('user/settings-accounts');
            })
            .catch(next);
    }
    accountsEditUsername(req, res, next) {
        User.findOne({})
            .then((user) => {
                res.render('user/edit-username');
            })
            .catch(next);
    }
    accountsEditPassword(req, res, next) {
        User.findOne({})
            .then((user) => {
                res.render('user/edit-password');
            })
            .catch(next);
    }
    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/user/settings/accounts');
            })
            .catch(next);
    }
}

module.exports = new UserController();
