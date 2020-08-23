// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

const Course = require('../models/Course');
const User = require('../models/User');

const bcrypt = require('bcryptjs');
const passport = require('passport');

// const users = [];

class UserController {
    //   [GET] /users/register
    register(req, res) {
        res.render('users/register');
    }
    //   [GET] /users/login
    login(req, res) {
        res.render('users/login');
    }
    //   [POST] /users/register

    signup(req, res) {
        const today = new Date();
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            created: today,
        };

        User.findOne({
            email: req.body.email,
        })
            .then((user) => {
                if (!user) {
                    bcrypt.hash(req.body.password, 10, (error, hash) => {
                        userData.password = hash;
                        User.create(userData)
                            .then((user) => {
                                res.redirect('/users/login');
                                // res.json({ status: user.email + "Registered!" });
                            })
                            .catch((error) => {
                                res.send('error: ' + error);
                            });
                    });
                } else {
                    res.json({ error: 'User already exists' });
                }
            })
            .catch((error) => {
                res.send('error: ' + error);
            });
        // try {
        //   const hashedPassword = bcrypt.hash(req.body.password, 10);
        //   users.push({
        //     id: Date.now().toString(),
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password,
        //   });
        //   res.redirect("/user/login");
        // } catch {
        //   res.redirect("/user/register");
        // }
        // req.body.email;
    }

    signin(req, res) {
        User.findOne({
            email: req.body.email,
        })
            .then((user) => {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        // Password match
                        const payload = {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                        };
                        let token = jwt.sign(payload, process.env.SECRET_KEY, {
                            expires: 1440,
                        });
                        res.send(token);
                    } else {
                        // Password don't match
                        res.json({ error: 'User does not exists' });
                    }
                } else {
                    res.json({ error: 'User does not exist' });
                }
            })
            .catch((error) => {
                res.send('error: ' + error);
            });
    }
    profile(req, res) {
        const decoded = jwt.verify(
            req.headers['authorization'],
            process.env.SECRET_KEY,
        );
        User.findOne({
            _id: decoded._id,
        })
            .then((user) => {
                if (user) {
                    res.json(user);
                } else {
                    res.send('User does not exist');
                }
            })
            .catch((error) => {
                res.send('error: ' + error);
            });
    }
}

module.exports = new UserController();
