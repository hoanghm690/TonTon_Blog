const express = require('express');
const router = express.Router();

const multer = require('multer');
const userValidate = require('../app/middlewares/userValidate');
const userController = require('../app/controllers/UserController');

const requireLogin = require('../app/middlewares/userMiddleware');
// const upload = multer({ dest: 'src/public/uploads/' });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/uploads/');
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
router.get('/logout', userController.logout);

router.get('/settings', requireLogin, userController.settings);
router.get('/settings/accounts', requireLogin, userController.accountsShow);

module.exports = router;
