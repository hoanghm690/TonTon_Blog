const express = require('express');
const router = express.Router();
const requireLogin = require('../app/middlewares/userMiddleware');
const checkAdmin = require('../app/middlewares/checkAdmin');
const meController = require('../app/controllers/MeController');

router.get(
    '/stored/courses',
    requireLogin,
    checkAdmin,
    meController.storedCourses,
);
router.get(
    '/trash/courses',
    requireLogin,
    checkAdmin,
    meController.trashCourses,
);
router.get('/stored/news', requireLogin, checkAdmin, meController.storedNews);

module.exports = router;
