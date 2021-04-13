const router = require("express").Router();
const Book = require("../models/Book");

router.get("/:title", (req, res) => {
  Book.find({title: {$regex: req.params.title}}, (err, book) => {
      if(err) res.send(err);
      res.json(book);
  });
});

module.exports = router;
