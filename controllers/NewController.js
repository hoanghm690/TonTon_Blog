const New = require('../models/New');
const { mongooseToObject } = require('../util/mongoose');

class NewController {
    show(req, res, next) {
        New.findOne({ slug: req.params.slug })
            .then((news) =>
                res.render('news/show', {
                    news: mongooseToObject(news),
                }),
            )
            .catch(next);
    }
    create(req, res, next) {
        res.render('news/create');
    }
    store(req, res, next) {
        const news = new New(req.body);
        news
            .save()
            .then(() => res.redirect('/news'))
            .catch(next);
    }
    
}
module.exports = new NewController();
