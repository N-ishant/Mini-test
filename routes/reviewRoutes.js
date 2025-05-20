const express = require('express');
const { submitReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:id/reviews', authenticate, submitReview);
router.put('/reviews/:id', authenticate, updateReview);
router.delete('/reviews/:id', authenticate, deleteReview);

module.exports = router;