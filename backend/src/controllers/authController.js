const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({ name, email, passwordHash, role, phone });
    await user.save();
    const token = generateToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

exports.me = async (req, res) => {
  try {
    const user = await require('../models/User').findById(req.user.id).select('-passwordHash');
    res.json(user);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

exports.updatePreferences = async (req, res) => {
  try {
    const updates = req.body;
    const user = await require('../models/User').findByIdAndUpdate(req.user.id, { $set: { preferences: updates } }, { new: true }).select('-passwordHash');
    res.json(user);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};
