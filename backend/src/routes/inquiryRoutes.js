const router = require('express').Router();
const { authMiddleware } = require('../utils/jwt');
const { createInquiry, getInquiriesForOwner, updateInquiryStatus } = require('../controllers/inquiryController');

router.post('/', authMiddleware, createInquiry);
router.get('/owner', authMiddleware, getInquiriesForOwner);
router.patch('/:id', authMiddleware, updateInquiryStatus);

module.exports = router;
