const md5 = require('md5');
const User = require('../models/User');
const logout = require('express-passport-logout');

const cloudinary = require('cloudinary').v2;
const fs= require("fs");
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET  
  });

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
        // req.body.avatar = req.file.path
        //     .split('\\')
        //     .slice(-2)
        //     .join('/');
        cloudinary.uploader.upload(req.file.path, (error, result) => {
            if(error){
                return res.json({msg: "Lỗi, thử lại"});
            }
            User.findOne({ username: username })
                .then((user) => {
                    if (!user) {
                        User.create({
                            username: username,
                            password: hashedPassword,
                            avatar: result.url,
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
    changePassword(req, res, next) {}
}

module.exports = new UserController();
