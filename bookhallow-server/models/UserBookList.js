const mongoose = require('mongoose');
let UserBook = require('./UserBook');

const bookListSchema = new mongoose.Schema({
  userId: String,
  name:{
     type: String,
     required: true
  },
  description: String,
  dateCreated: {type: Date, default: Date.now},
  books: [String]
});


module.exports = BookList = mongoose.model('BookList', bookListSchema);
