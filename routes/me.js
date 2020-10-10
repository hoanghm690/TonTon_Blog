const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/userMiddleware');
const checkAdmin = require('../middlewares/checkAdmin');
const meController = require('../controllers/MeController');

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
router.get('/stored/users', requireLogin, checkAdmin, meController.storedUsers);

module.exports = router;
