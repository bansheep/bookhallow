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
    bindingType: String,
    length: Number,
    isbn: Number,
    isbn13: Number,

});



module.exports = Book = mongoose.model('Book', bookSchema);
