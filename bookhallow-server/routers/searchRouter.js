const router = require("express").Router();
const Book = require("../models/Book");

function getBookByTitle(req, res){
  Book.find({title: {$regex: req.params.title}}, (err, book) => {
      if(err) console.error(err);
      res.json(book);
  });
}


module.exports = {router, getBookByTitle};
