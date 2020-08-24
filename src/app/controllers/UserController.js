const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

class UserController {
    register(req, res) {
        res.render('user/register');
    }
    login(req, res) {
        res.render('user/login');
    }
    signin(req, res) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) throw err;

            user.comparePassword(req.body.password, (err, isMatch) => {
                //use method via model
                if (err) throw err;

                if (isMatch) {
                    let token = jwt.sign({ id: user._id }, config.secret, {
                        //set up token via jwt for 24 hours
                        expiresIn: 86400,
                    });
                    res.status(200).send({
                        msg: 'Đăng nhập thành công',
                        token,
                    }); //If match, create token/set auth true
                } else {
                    res.status(500).send({ msg: 'Mật khẩu không đúng' });
                }
            });
        });
    }
    signup(req, res) {
        let newUser = new User({
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password,
        });
        newUser
            .save()
            .then((result) => {
                console.log(result);
                res.status(200).send({
                    msg: 'Đăng ký thành công',
                    user_id: result._id,
                }); //If match, create token/set auth true
            })
            .catch((err) => {
                console.log(err);
                res.send({ msg: 'Đăng ký không thành công' });
            });
    }
}

module.exports = new UserController();
