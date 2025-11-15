const router = require('express').Router();
const { authMiddleware } = require('../utils/jwt');
const { getRecommendations } = require('../controllers/recommendationController');

router.get('/', authMiddleware, getRecommendations);

module.exports = router;
