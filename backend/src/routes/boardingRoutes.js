const router = require('express').Router();
const { authMiddleware } = require('../utils/jwt');
const { createBoarding, getBoardings, getBoardingById, updateBoarding, deleteBoarding } = require('../controllers/boardingController');

router.get('/', getBoardings);
router.get('/:id', getBoardingById);
router.post('/', authMiddleware, createBoarding);
router.patch('/:id', authMiddleware, updateBoarding);
router.delete('/:id', authMiddleware, deleteBoarding);

module.exports = router;
