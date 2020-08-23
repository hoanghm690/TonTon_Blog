const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/register', userController.register);
router.post('/register', userController.signup);
router.get('/login', userController.login);
router.post('/login', userController.signin);

module.exports = router;
