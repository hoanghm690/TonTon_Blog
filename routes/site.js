const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/userMiddleware');
const checkUser = require('../middlewares/checkUser');
const siteController = require('../controllers/SiteController');

router.get('/error', checkUser, siteController.error);
router.get('/search', checkUser, siteController.search);
router.get('/courses', siteController.courses);
router.get('/news', siteController.news);
router.get('/', siteController.index);

module.exports = router;
