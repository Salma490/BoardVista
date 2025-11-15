const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  boarding: { type: mongoose.Schema.Types.ObjectId, ref: 'Boarding' },
  message: { type: String, required: true },
  status: { type: String, enum: ['open','reviewing','resolved','rejected'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
