const Review = require('../models/Review');
const Book = require('../models/Book');

exports.submitReview = async (req, res) => {
    const { rating, comment } = req.body;
    const review = new Review({ book: req.params.id, user: req.user.id, rating, comment });
    await review.save();
    await Book.findByIdAndUpdate(req.params.id, { $push: { reviews: review._id } });
    res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();
    res.json(review);
};

exports.deleteReview = async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    await review.remove();
    res.json({ message: 'Review deleted' });
};