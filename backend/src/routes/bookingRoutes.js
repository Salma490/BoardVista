const router = require('express').Router();
const { authMiddleware } = require('../utils/jwt');
const { requestBooking, getBookingsForOwner, updateBookingStatus } = require('../controllers/bookingController');

router.post('/', authMiddleware, requestBooking);
router.get('/owner', authMiddleware, getBookingsForOwner);
router.patch('/:id', authMiddleware, updateBookingStatus);

module.exports = router;
