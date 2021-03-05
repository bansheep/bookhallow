const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    _userId: Number,
    armor: {type:Array, "default" : []},
    potions: {type:Array, "default" : []},
    special: {type:Array, "default" : []},
    pets: {type:Array, "default" : []},
})
module.exports = Inventory = mongoose.model('Inventory', inventorySchema);
