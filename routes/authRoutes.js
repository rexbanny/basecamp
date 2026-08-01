const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/authController');
const { requireLogin } = require('../middleware/auth');

router.post('/register', controller.register);
router.post('/login',    controller.login);
router.post('/logout',   controller.logout);
router.get('/me',        requireLogin, controller.me);

module.exports = router;
