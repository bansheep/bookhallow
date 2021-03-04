const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema {
    _id: Number,
    username: String,
    password: String,
    characterClass: String,
    xp: Number,
    hitPoints: Number,
    level: Number,
    skills: {type:Array, "default" : []},
    coins: Number,
    modifiers: {type:Array, "default" : []},
    armor: {type:Array, "default" : []},
    bookShelves: {type:Array, "default" : []},
    challenges: {type:Array, "default" : []},
    friends: {type:Array, "default" : []},
}

module.exports = mongoose.model('User', userSchema);
