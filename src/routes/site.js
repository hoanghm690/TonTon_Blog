const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/courses', siteController.courses);
router.get('/register', siteController.register);
router.get('/login', siteController.login);
router.post('/register', siteController.register);
router.post('/login', siteController.login);
router.get('/', siteController.index);

module.exports = router;
