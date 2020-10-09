const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/userMiddleware');
const newsController = require('../controllers/NewsController');
const checkUser = require('../middlewares/checkUser');

router.get('/', requireLogin, checkUser, newsController.index);

module.exports = router;
