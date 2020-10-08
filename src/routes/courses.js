const express = require('express');
const router = express.Router();
const requireLogin = require('../app/middlewares/userMiddleware');
const checkAdmin = require('../app/middlewares/checkAdmin');
const checkUser = require('../app/middlewares/checkUser');
const courseController = require('../app/controllers/CourseController');

router.get('/create', requireLogin, checkAdmin, courseController.create);
router.post('/store', requireLogin, checkAdmin, courseController.store);
router.get('/:id/edit', requireLogin, checkAdmin, courseController.edit);
router.post(
    '/handle-form-actions',
    requireLogin,
    checkAdmin,
    courseController.handleFormActions,
);

router.put('/:id', requireLogin, checkAdmin, courseController.update);
router.patch(
    '/:id/restore',
    requireLogin,
    checkAdmin,
    courseController.restore,
);
router.delete('/:id', requireLogin, checkAdmin, courseController.delete);
router.delete(
    '/:id/force',
    requireLogin,
    checkAdmin,
    courseController.forceDelete,
);

router.get('/:slug', requireLogin, checkUser, courseController.show);

module.exports = router;
