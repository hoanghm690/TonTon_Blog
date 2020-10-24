const Course = require('../models/Course');
const New = require('../models/New');
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
                User.findOne({ _id: req.signedCookies.userId })
                    .then((user) => {
                        if (user) {
                            res.locals.user = user;
                            res.render('courses', {
                                courses: mutipleMongooseToObject(courses),
                            });
                        }
                        else{
                            res.render('courses', {
                                courses: mutipleMongooseToObject(courses),
                            });
                        }
                    })
                    .catch(next);            
            })
            .catch(next);
        
    }
    news(req, res, next){
        New.find({})
            .then(news => {
                User.findOne({ _id: req.signedCookies.userId })
                    .then((user) => {
                        if (user) {
                            res.locals.user = user;
                            res.render('news',{
                                news: mutipleMongooseToObject(news),
                            });
                        }
                        else{
                            res.render('news',{
                                news: mutipleMongooseToObject(news),
                            });
                        }
                    })
                    .catch(next);
            })
            .catch(next);  
    }
    error(req, res) {
        res.render('error');
    }
}
module.exports = new SiteController();
