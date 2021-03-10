const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userBookSchema = new Schema({
    bookId: String,
    rating: Number,
    dateAdded: Date,
    datesRead: [Date],
    shelves: [String],
    challenges: [String],
})

module.exports = mongoose.model('UserBook', userBookSchema);
