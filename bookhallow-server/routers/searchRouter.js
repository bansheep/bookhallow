const router = require("express").Router();
const Book = require("../models/Book");

router.get('/search/:title', function(req, res, next) {
    var title = req.params.title;
    Book.find({title: title}, function (err, book) {
        if(err) {
           console.error(err);
        }
          res.json(book);
    });
});
