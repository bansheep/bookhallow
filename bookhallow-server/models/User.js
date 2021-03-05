const mongoose = require('mongoose');

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
