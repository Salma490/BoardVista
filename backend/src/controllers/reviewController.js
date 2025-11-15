const Review = require('../models/Review');
const Boarding = require('../models/Boarding');

exports.createReview = async (req, res) => {
  try {
    const { boardingId, rating, comment } = req.body;
    const review = new Review({ boarding: boardingId, user: req.user.id, rating, comment });
    await review.save();
    const reviews = await Review.find({ boarding: boardingId });
    const avg = reviews.reduce((s,r)=>s + r.rating, 0)/reviews.length;
    await Boarding.findByIdAndUpdate(boardingId, { rating: avg, reviewsCount: reviews.length });
    res.json(review);
  } catch (err) { console.error(err); res.status(500).json({ error:'Server error' }); }
};

exports.getReviewsForBoarding = async (req, res) => {
  try {
    const reviews = await Review.find({ boarding: req.params.boardingId }).populate('user','name');
    res.json(reviews);
  } catch (err) { res.status(500).json({ error:'Server error' }); }
};
