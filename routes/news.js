const express = require('express');
const router = express.Router();
const requireLogin = require('../app/middlewares/userMiddleware');
const newsController = require('../app/controllers/NewsController');
const checkUser = require('../app/middlewares/checkUser');

router.get('/', requireLogin, checkUser, newsController.index);

module.exports = router;
