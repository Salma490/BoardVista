const Boarding = require('../models/Boarding');
const User = require('../models/User');

function roommateMatchScore(userPrefs, boarding) {
  let score = 0;
  if (userPrefs?.budgetMin && userPrefs?.budgetMax) {
    if (boarding.rent >= userPrefs.budgetMin && boarding.rent <= userPrefs.budgetMax) score += 40;
  }
  const required = userPrefs?.preferredFacilities || [];
  const matchCount = required.filter(f => boarding.facilities.includes(f)).length;
  score += matchCount * 10;
  if (userPrefs?.roommatesGender && boarding.gender === userPrefs.roommatesGender) score += 20;
  return score;
}

exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const all = await Boarding.find({ approved: true });
    const scored = all.map(b => ({ boarding: b, score: roommateMatchScore(user.preferences || {}, b) }));
    scored.sort((a,b)=>b.score - a.score);
    res.json(scored.slice(0, 20).map(s => s.boarding));
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};
