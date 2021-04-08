const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
       type: String,
       required: true
    },
    authorFirst:{
       type: String,
       required: true
    },
    authorLast:{
       type: String,
       required: true
    },

    authorSuffix: String,
    publisher: String,
    originalYear: Number,
    publishedYear: Number,

    versions: [{
      binding: {
      type: String,
      default: "",
      required: true
      },
      isbn: {
        type: Number
      },
      isbn13: {
      type: Number
      },
      length: {
        type: Number,
        required: true,
        min: 1
      },
      publishedYear: Number
    }],

    length: {
      type: Number,
      required: true,
      min: 1
    },
    isbn: Number,
    isbn13: Number,

});

module.exports = Book = mongoose.model('Book', bookSchema);
