const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  boarding: { type: mongoose.Schema.Types.ObjectId, ref: 'Boarding' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Review', ReviewSchema);
