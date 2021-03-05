const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userBookSchema = new Schema({
    _bookId: Number,
    _userId: Number,
    rating: Number,
    dateAdded: Date,
    datesRead: {type: Array, "default":[]},
    shelves: {type: Array, "default":[]},
    challenges: {type: Array, "default":[]},
})

module.exports = mongoose.model('UserBook', userBookSchema);
