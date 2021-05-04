const mongoose = require('mongoose');
let UserBook = require('./UserBook');
let UserBookList = require('./UserBookList');

const userSchema = new mongoose.Schema({
   username:{
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },

   books: {
     type: [String],
     default: []
   },

   bookLists:{
     type: [String],
     default: []
   },

   character: {
     type: String,
     default: "UNKNOWN"
   }
});


module.exports = User = mongoose.model('User', userSchema);
