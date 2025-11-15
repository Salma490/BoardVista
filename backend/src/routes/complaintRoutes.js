const router = require('express').Router();
const { authMiddleware } = require('../utils/jwt');
const { createComplaint, getAllComplaints, updateComplaintStatus } = require('../controllers/complaintController');

router.post('/', authMiddleware, createComplaint);
router.get('/', authMiddleware, getAllComplaints); // protect further (admin) in prod
router.patch('/:id', authMiddleware, updateComplaintStatus);

module.exports = router;
