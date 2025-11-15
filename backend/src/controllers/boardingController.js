const Boarding = require('../models/Boarding');

exports.createBoarding = async (req, res) => {
  try {
    const data = req.body;
    data.owner = req.user.id;
    const b = new Boarding(data);
    await b.save();
    res.json(b);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};

exports.getBoardings = async (req, res) => {
  try {
    const { minPrice, maxPrice, lat, lng, distanceKm, sortBy, facilities, gender, owner } = req.query;
    let q = {};
    if (minPrice) q.rent = { ...q.rent, $gte: Number(minPrice) };
    if (maxPrice) q.rent = { ...q.rent, $lte: Number(maxPrice) };
    if (facilities) q.facilities = { $all: facilities.split(',') };
    if (gender) q.gender = gender;
    if (owner === 'true' && req.user) q.owner = req.user.id;
    if (lat && lng && distanceKm) {
      q.location = { $nearSphere: { $geometry: { type: 'Point', coordinates: [Number(lng), Number(lat)] }, $maxDistance: Number(distanceKm)*1000 } };
    }
    let query = Boarding.find(q).populate('owner','name phone email');
    if (sortBy === 'priceAsc') query = query.sort({ rent: 1 });
    if (sortBy === 'priceDesc') query = query.sort({ rent: -1 });
    const results = await query.exec();
    res.json(results);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};

exports.getBoardingById = async (req, res) => {
  try {
    const b = await Boarding.findById(req.params.id).populate('owner','name phone email');
    if (!b) return res.status(404).json({ error: 'Not found' });
    res.json(b);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};

exports.updateBoarding = async (req, res) => {
  try {
    const b = await Boarding.findById(req.params.id);
    if (!b) return res.status(404).json({ error:'Not found' });
    if (b.owner.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error:'Not owner' });
    const updated = await Boarding.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};

exports.deleteBoarding = async (req, res) => {
  try {
    const b = await Boarding.findById(req.params.id);
    if (!b) return res.status(404).json({ error:'Not found' });
    if (b.owner.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error:'Not owner' });
    await Boarding.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};
