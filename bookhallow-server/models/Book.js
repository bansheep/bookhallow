const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
       type: String,
       required: true
<<<<<<< HEAD
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
=======
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


>>>>>>> 9a20fbf975ee98d16278bfab43d82b6703bf0bb9

module.exports = Book = mongoose.model('Book', bookSchema);
