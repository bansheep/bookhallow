const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userBookSchema = new Schema({
    bookId: {
       type: String,
       required: true
    },
    userId: {
       type: String,
       required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    dateAdded: {type: Date, default: Date.now},
    datesRead:{
      type: [Date],
      default: []
    },
    lists: {
      type: [String],
      default: []
    },
    challenges: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      default: "Unread"
    }
})

module.exports = mongoose.model('UserBook', userBookSchema);
