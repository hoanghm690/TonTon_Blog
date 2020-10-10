const coursesRouter = require('./courses');
const meRouter = require('./me');
const userRouter = require('./user');
const siteRouter = require('./site');

function route(app) {
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
