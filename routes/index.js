const coursesRouter = require('./courses');
const meRouter = require('./me');
const userRouter = require('./user');
const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/news', newsRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
