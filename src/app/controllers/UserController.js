const User = require('../models/User');
const jwt = require('jsonwebtoken');

class UserController {
    register(req, res) {
        res.render('user/register');
    }
    login(req, res) {
        res.render('user/login');
    }
    signin(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        User.findOne({ username: username, password: password })
            .then((data) => {
                if (data) {
                    const token = jwt.sign(
                        {
                            _id: data._id,
                        },
                        'pass',
                    );
                    return res.json({
                        message: 'Đăng nhập thành công',
                        token: token,
                    });
                } else {
                    res.status(300).json('Accout không đúng');
                }
            })
            .catch((err) => {
                res.status(500).json('Có lỗi bên server');
            });
    }
    signup(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        User.findOne({
            username: username,
        })
            .then((data) => {
                if (data) {
                    res.json('Người dùng này đã tồn tại');
                } else {
                    return User.create({
                        username: username,
                        password: password,
                    });
                }
            })
            .then((data) => {
                res.redirect('/user/login');
            })
            .catch((err) => {
                res.status(500).json('Tạo tài khoản thất bại');
            });
    }
}

module.exports = new UserController();
