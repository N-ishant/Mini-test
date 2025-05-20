const Book = require('../models/Book');

exports.addBook = async (req, res) => {
    const { title, author, genre } = req.body;
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json(book);
};

exports.getAllBooks = async (req, res) => {
    const { page = 1, limit = 10, author, genre } = req.query;
    const query = {};
    if (author) query.author = author;
    if (genre) query.genre = genre;

    const books = await Book.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
    res.json(books);
};

exports.getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id).populate('reviews');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
};