const mongoose = require('mongoose');

const BoardingSchema = new mongoose.Schema({
  title: String,
  description: String,
  address: String,
  location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: [Number] }, // [lng, lat]
  rent: Number,
  capacity: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  photos: [String],
  facilities: [String],
  phone: String,
  gender: { type: String, enum: ['male','female','mixed'], default: 'mixed' },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  approved: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
BoardingSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Boarding', BoardingSchema);
