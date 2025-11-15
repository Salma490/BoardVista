const User = require('../models/User');
const Boarding = require('../models/Boarding');
const Complaint = require('../models/Complaint');

exports.getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const owners = await User.countDocuments({ role: 'owner' });
    const boardings = await Boarding.countDocuments();
    const complaints = await Complaint.countDocuments({ status: 'open' });
    res.json({ users, owners, boardings, openComplaints: complaints });
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};

exports.approveListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Boarding.findByIdAndUpdate(id, { approved: true }, { new: true });
    res.json(listing);
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};

exports.rejectListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Boarding.findByIdAndUpdate(id, { approved: false }, { new: true });
    res.json(listing);
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};
