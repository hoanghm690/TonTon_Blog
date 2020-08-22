const Course = require('../models/Course');
const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // [GET] /
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
    // [GET] /search
    search(req, res) {
        res.render('search');
    }
    //   [GET] /courses
    courses(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('courses', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    //   [GET] /register
    register(req, res) {
        res.render('register');
    }
    //   [GET] /login
    login(req, res) {
        res.render('login');
    }
    //   //   [POST] /register
    //   register(req, res) {
    //     const email = req.body.email;
    //     const password = req.body.password;

    //     const newUser = new User({
    //       email: email,
    //       password: password,
    //     });
    //     newUser.save((err) => {
    //       err ? console.log(err) : res.send("Succesfully Created User");
    //     });
    //   }
    //   //   [POST] /login
    //   login(req, res) {
    //     const email = req.body.email;
    //     const password = req.body.password;

    //     User.findOne({ email: email }, (err, foundResults) => {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         if (foundResults.password === password) {
    //           res.send("You Logged In!");
    //         } else {
    //           res.send("Incorrect Email or Password!");
    //         }
    //       }
    //     });
    //   }
}
module.exports = new SiteController();
