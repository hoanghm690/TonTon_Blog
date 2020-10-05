const express = require('express');
const router = express.Router();
const requireLogin = require('../app/middlewares/userMiddleware');
const siteController = require('../app/controllers/SiteController');

router.get('/error', siteController.error);
router.get('/search', siteController.search);
router.get('/courses', requireLogin, siteController.courses);
router.get('/', requireLogin, siteController.index);

module.exports = router;
