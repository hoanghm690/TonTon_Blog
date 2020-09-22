const express = require('express');
const router = express.Router();
const requireLogin = require('../app/middlewares/userMiddleware');
const courseController = require('../app/controllers/CourseController');

router.get('/create', requireLogin, courseController.create);
router.post('/store', requireLogin, courseController.store);
router.get('/:id/edit', requireLogin, courseController.edit);
router.post(
    '/handle-form-actions',
    requireLogin,
    courseController.handleFormActions,
);

router.put('/:id', requireLogin, courseController.update);
router.patch('/:id/restore', requireLogin, courseController.restore);
router.delete('/:id', requireLogin, courseController.delete);
router.delete('/:id/force', requireLogin, courseController.forceDelete);

router.get('/:slug', requireLogin, courseController.show);

module.exports = router;
