const express = require('express');
const router = express.Router();

const multer = require('multer');
const userValidate = require('../app/middlewares/userValidate');
const userController = require('../app/controllers/UserController');

const upload = multer({ dest: 'src/public/uploads/' });

router.get('/register', userController.register);
router.post(
    '/register',
    upload.single('avatar'),
    userValidate,
    userController.signup,
);
router.get('/login', userController.login);
router.post('/login', userController.signin);

module.exports = router;
