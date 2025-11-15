const router = require('express').Router();
const { register, login, me, updatePreferences } = require('../controllers/authController');
const { authMiddleware } = require('../utils/jwt');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, me);
router.patch('/me/preferences', authMiddleware, updatePreferences);

module.exports = router;
