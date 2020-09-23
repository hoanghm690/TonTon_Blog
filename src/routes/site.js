const express = require('express');
const router = express.Router();
const requireLogin = require('../app/middlewares/userMiddleware');
const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/courses', requireLogin, siteController.courses);
router.get('/', siteController.index);

module.exports = router;
