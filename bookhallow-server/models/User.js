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
     classType: {
       type: String,
       default: "Unknown"
     },
     level: {
       type: Number,
       default: 0
     },
     experience: {
       type: Number,
       default: 0
     },
     health: {
       type: Number,
       default: 50
     },
     skills: {
       type: [String],
       default: []
     }
   }
});


//
// let userSchema = new Schema ({
//     _id: Number,
//     username: String,
//     password: String,
//     characterClass: String,
//     xp: Number,
//     hitPoints: Number,
//     level: Number,
//     skills: {type:Array, "default" : []},
//     coins: Number,
//     modifiers: {type:Array, "default" : []},
//     armor: {type:Array, "default" : []},
//     bookShelves: {type:Array, "default" : []},
//     challenges: {type:Array, "default" : []},
//     friends: {type:Array, "default" : []},
// }
// )

module.exports = User = mongoose.model('User', userSchema);
