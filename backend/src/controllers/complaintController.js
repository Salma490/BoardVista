const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  try {
    const { message, targetUser, boarding } = req.body;
    const complaint = new Complaint({ fromUser: req.user.id, targetUser, boarding, message });
    await complaint.save();
    res.json(complaint);
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('fromUser','name email').populate('targetUser','name email').populate('boarding','title');
    res.json(complaints);
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const c = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
    res.json(c);
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};
