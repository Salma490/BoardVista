const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  boarding: { type: mongoose.Schema.Types.ObjectId, ref: 'Boarding', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['requested','confirmed','cancelled','completed'], default: 'requested' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
