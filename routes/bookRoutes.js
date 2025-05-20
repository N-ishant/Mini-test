const express = require('express');
const { addBook, getAllBooks, getBookById } = require('../controllers/bookController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, addBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);

module.exports = router;