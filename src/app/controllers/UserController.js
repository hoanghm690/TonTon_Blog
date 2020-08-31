const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//middalware
class UserController {
    register(req, res) {
        res.render('user/register');
    }
    login(req, res) {
        res.render('user/login');
    }
    signin(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(500)
                .json({ error: 'Vui lòng nhập đầy đủ thông tin!' });
        }
        User.findOne({ username: username })
            .then((savedUser) => {
                if (!savedUser) {
                    return res
                        .status(500)
                        .json({
                            error: 'Tên người dùng hoặc mật khẩu không hợp lệ!',
                        });
                }
                bcrypt
                    .compare(password, savedUser.password)
                    .then((doMatch) => {
                        if (doMatch) {
                            // res.json({ message: "Đăng nhập thành công" });
                            const token = jwt.sign(
                                { _id: savedUser._id },
                                'pass',
                            );
                            const { _id, username } = savedUser;
                            res.json({ token, user: { _id, username } });
                        } else {
                            return res.status(422).json({
                                error:
                                    'Tên người dùng hoặc mật khẩu không hợp lệ!',
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    signup(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(500)
                .json({ error: 'Vui lòng thêm tất cả các trường!' });
        }
        User.findOne({ username: username })
            .then((savedUser) => {
                if (savedUser) {
                    return res
                        .status(200)
                        .json({ error: 'Người dùng này đã tồn tại!' });
                }
                bcrypt.hash(password, 12).then((hashedpassword) => {
                    const user = new User({
                        username,
                        password: hashedpassword,
                    });
                    user.save()
                        .then((user) => {
                            //   res.json({ message: "Đăng ký thành công" });
                            res.redirect('/user/login');
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = new UserController();
