const Course = require('../models/Course');
const User = require('../models/User');

const { mutipleMongooseToObject } = require('../util/mongoose');
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
    error(req, res) {
        res.render('error');
    }
}
module.exports = new SiteController();
