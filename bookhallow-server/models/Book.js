const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
       type: String,
       required: true
    }
});

// const bookSchema = new mongoose.Schema({
//     title: String,
//     authorFirst: String,
//     authorLast: String,
//     authorSuffix: String,
//     additionalAuthors: String,
//     publisher: String,
//     originalYear: Number,
//     publishedYear: Number,
//     binding: String,
//     numPages: Number,
//     isbn: Number,
//     isbn13: Number,
//     image:String
// });

module.exports = Book = mongoose.model('Book', bookSchema);
