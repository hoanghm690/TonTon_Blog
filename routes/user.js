const express = require('express');
const path = require('path');
const router = express.Router();

const multer = require('multer');
const userValidate = require('../middlewares/userValidate');
const userController = require('../controllers/UserController');
const requireLogin = require('../middlewares/userMiddleware');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
router.get('/register', userController.register);
router.post(
    '/register',
    upload.single('avatar'),
    userValidate,
    userController.signup,
);
router.get('/login', userController.login);
router.post('/login', userController.signin);

router.get('/settings', requireLogin, userController.settings);
router.get('/settings/accounts', requireLogin, userController.accountsShow);
router.get(
    '/settings/accounts/edit/username',
    requireLogin,
    userController.accountsEditUsername,
);
router.get(
    '/settings/accounts/edit/password',
    requireLogin,
    userController.accountsEditPassword,
);
router.put('/:id', requireLogin, userController.update);
router.delete('/:id', requireLogin, userController.delete);
router.get('/logout', userController.logout);
router.post('/change_password', userController.changePassword);

module.exports = router;
