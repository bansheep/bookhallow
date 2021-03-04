const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");

const app = express();

const port = 5000;

app.use(bodyParser.urlencoded({
  extended: true
}));

//app.set('view engine', 'ejs');
//app.use(express.static("../app/public"));

mongoose.connect("mongodb://localhost:27017/bookhallowDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const bookSchema = {
    _id: Number,
    title: String,
    authorFirst: String,
    authorLast: String,
    authorSuffix: String,
    additionalAuthors: String,
    publisher: String,
    originalYear: Number,
    publishedYear: Number,
    binding: String,
    numPages: Number,
    isbn: Number,
    isbn13: Number,
    image:String
};
const Book = mongoose.model("Book", bookSchema);

const userSchema = {
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
const User = mongoose.model("User", userSchema);

const inventorySchema = {
    _userId: Number,
    armor: {type:Array, "default" : []},
    potions: {type:Array, "default" : []},
    special: {type:Array, "default" : []},
    pets: {type:Array, "default" : []},
}
const Inventory = mongoose.model("Inventory", inventorySchema);

const userBookSchema ={
    _bookId: Number,
    _userId: Number,
    rating: Number,
    dateAdded: Date,
    datesRead: {type: Array, "default":[]},
    shelves: {type: Array, "default":[]},
    challenges: {type: Array, "default":[]},
}
const UserBook = mongoose.model("UserBook", userBookSchema);


app.route("/books") // Get route that fetches all bookSchema
  .get(function(req, res) {
    Book.find(function(err, foundBooks) {
      if (err) {
        res.send(err);
      } else {
        res.send(foundBooks);
      }
    });
});

app.get("/", (req,res)=> res.send("Hello World!"));
app.listen(port, () => console.log("Listening on port " + port) );
