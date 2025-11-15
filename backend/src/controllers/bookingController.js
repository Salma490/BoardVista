const Booking = require('../models/Booking');
const Boarding = require('../models/Boarding');

exports.requestBooking = async (req, res) => {
  try {
    const { boardingId, startDate, endDate } = req.body;
    const booking = new Booking({ boarding: boardingId, user: req.user.id, startDate, endDate });
    await booking.save();
    res.json(booking);
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};

exports.getBookingsForOwner = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const boardings = await Boarding.find({ owner: ownerId }).select('_id');
    const bIds = boardings.map(b=>b._id);
    const bookings = await Booking.find({ boarding: { $in: bIds } }).populate('user','name email phone').populate('boarding','title rent');
    res.json(bookings);
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    res.json(booking);
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};
