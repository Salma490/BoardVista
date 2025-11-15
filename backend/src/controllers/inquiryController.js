const Inquiry = require('../models/Inquiry');
const Boarding = require('../models/Boarding');

exports.createInquiry = async (req, res) => {
  try {
    const { boardingId, message } = req.body;
    const inquiry = new Inquiry({ boarding: boardingId, fromUser: req.user.id, message });
    await inquiry.save();
    res.json(inquiry);
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};

exports.getInquiriesForOwner = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const boardings = await Boarding.find({ owner: ownerId }).select('_id');
    const bIds = boardings.map(b=>b._id);
    const inquiries = await Inquiry.find({ boarding: { $in: bIds } }).populate('fromUser','name email phone').populate('boarding','title');
    res.json(inquiries);
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};

exports.updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    res.json(inquiry);
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};
