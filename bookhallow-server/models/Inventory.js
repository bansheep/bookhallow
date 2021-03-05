const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    _userId: Number,
    armor: {type:Array, "default" : []},
    potions: {type:Array, "default" : []},
    special: {type:Array, "default" : []},
    pets: {type:Array, "default" : []},
})
module.exports = mongoose.model('Inventory', inventorySchema);
