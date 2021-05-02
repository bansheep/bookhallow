const router = require("express").Router();
const Book = require("../models/Book");
const auth = require("../middleware/auth");

// GET /book route to retrieve all books
router.get("/", async(req, res) => {
    let query = Book.find({});
    query.exec((err, books) => {
        if(err) next(err);
        res.json(books);
    });
});

// POST to save a new book.
router.post("/", async(req, res) => {
    //Creates a new book
    var newBook = new Book(req.body);
    //Save it into the DB.
    newBook.save((err,book) => {
        if(err) res.send(err);
        else res.json({message: "Book successfully added!", book });
    });
});

// GET /book/:id route to retrieve a book given its id.
router.get("/:id", (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if(err) res.send(err);
        else res.json(book);
    });
});

// DELETE /book/:id to delete a book given its id.
router.delete("/:id", (req, res) => {
    Book.deleteOne({_id : req.params.id}, (err, result) => {
        res.json({ message: "Book successfully deleted!", result });
    });
});

// PUT /book/:id to update a book given its id
router.put("/:id", (req, res) => {
    Book.findById({_id: req.params.id}, (err, book) => {
        if(err) res.send(err);
        Object.assign(book, req.body).save((err, book) => {
            if(err) res.send(err);
            res.json({ message: 'Book updated!', book });
        });
    });
});

module.exports = router;
