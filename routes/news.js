const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/userMiddleware');
const checkAdmin = require('../middlewares/checkAdmin');
const checkUser = require('../middlewares/checkUser');
const newController = require('../controllers/NewController');

router.get(
    '/create',
    requireLogin,
    checkAdmin,
    newController.create,
);
router.post(
    '/store',
    requireLogin,
    checkAdmin,
    newController.store,
);
router.post(
    '/handle-form-actions',
    requireLogin,
    checkAdmin,
    newController.handleFormActions,
);
router.get('/:id/edit', requireLogin, checkAdmin, newController.edit);
router.put('/:id', requireLogin, checkAdmin, newController.update);
router.delete('/:id', requireLogin, checkAdmin, newController.delete);
router.get(
    '/:slug', requireLogin, checkUser, newController.show,
);

module.exports = router;
