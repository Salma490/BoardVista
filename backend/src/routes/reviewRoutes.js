const router = require('express').Router();
const { authMiddleware } = require('../utils/jwt');
const { createReview, getReviewsForBoarding } = require('../controllers/reviewController');

router.post('/', authMiddleware, createReview);
router.get('/:boardingId', getReviewsForBoarding);

module.exports = router;
