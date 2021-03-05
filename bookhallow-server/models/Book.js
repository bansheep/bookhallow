const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    _id: Number,
    title: String,
    authorFirst: String,
    authorLast: String,
    authorSuffix: String,
    additionalAuthors: String,
    publisher: String,
    originalYear: Number,
    publishedYear: Number,
    binding: String,
    numPages: Number,
    isbn: Number,
    isbn13: Number,
    image:String
});

module.exports = mongoose.model('Book', bookSchema);
