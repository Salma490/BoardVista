const router = require('express').Router();
const { authMiddleware, adminOnly } = require('../utils/jwt');
const { getStats, getUsers, approveListing, rejectListing } = require('../controllers/adminController');

router.get('/stats', authMiddleware, adminOnly, getStats);
router.get('/users', authMiddleware, adminOnly, getUsers);
router.post('/listing/:id/approve', authMiddleware, adminOnly, approveListing);
router.post('/listing/:id/reject', authMiddleware, adminOnly, rejectListing);

module.exports = router;
