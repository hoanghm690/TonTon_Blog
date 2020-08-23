const newsRouter = require('./news');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const userRouter = require('./users');
const siteRouter = require('./site');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/users', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
