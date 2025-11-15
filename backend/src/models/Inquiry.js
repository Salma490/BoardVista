const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  boarding: { type: mongoose.Schema.Types.ObjectId, ref: 'Boarding', required: true },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String },
  status: { type: String, enum: ['pending','accepted','rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', InquirySchema);
