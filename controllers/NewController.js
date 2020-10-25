const New = require('../models/New');
const { mongooseToObject } = require('../util/mongoose');

class NewController {
    show(req, res, next) {
        New.findOne({ slug: req.params.slug })
            .then((news) =>
                res.render('news/show', {
                    new: mongooseToObject(news),
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
            .then(() => res.redirect('/me/stored/news'))
            .catch(next);
    }
    edit(req, res, next) {
        New.findById(req.params.id)
            .then((news) =>
                res.render('news/edit', {
                    new: mongooseToObject(news),
                }),
            )
            .catch(next);
    }
    update(req, res, next) {
        New.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/news'))
            .catch(next);
    }
    delete(req, res, next) {
        New.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                New.deleteMany({ _id: { $in: req.body.newIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.redirect('/error');
        }
    }  
}
module.exports = new NewController();
