const express = require('express');
const router = express.Router();
const requireLogin = require('../app/middlewares/userMiddleware');
const newsController = require('../app/controllers/NewsController');

router.get('/', requireLogin, newsController.index);

module.exports = router;
