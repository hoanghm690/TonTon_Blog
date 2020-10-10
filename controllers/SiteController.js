const Course = require('../models/Course');
const User = require('../models/User');

const { mutipleMongooseToObject } = require('../util/mongoose');
class SiteController {
    // [GET] /
    index(req, res, next) {
        User.findOne({ _id: req.signedCookies.userId })
            .then((user) => {
                if (user) {
                    res.locals.user = user;
                    res.render('home');
                }
                else{
                    res.render('home');
                }
            })
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
    news(req,res){
        res.render("news");
    }
    error(req, res) {
        res.render('error');
    }
}
module.exports = new SiteController();
