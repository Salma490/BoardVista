const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  role: { type: String, enum: ['student','staff','owner','admin'], default: 'student' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  phone: String,
  preferences: {
    budgetMin: Number,
    budgetMax: Number,
    preferredFacilities: [String],
    roommatesGender: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
