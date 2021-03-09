const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require("cors");
let bodyParser = require('body-parser');
let book = require('./routers/bookRouter')
let config = require('config'); //we load the db location from the JSON files
require('dotenv').config();
const Book = require("./models/Book");



// connect to MongoDB
mongoose.connect(config.DBHost, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection successfully established.")
})


// set up server
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on port: ' + PORT));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());



// set up routes
app.use("/auth", require("./routers/userRouter"));
//app.use("/book", require("./routers/bookRouter"));


app.get('/search/:title', function(req, res, next) {
    var title = req.params.title;
    Book.find({title: title}, function (err, book) {
        if(err) {
           console.error(err);
        }
          res.json(book);
    });
});


app.route("/book")
    .get(book.getBooks)
    .post(book.postBook);

app.route("/book/:id")
    .get(book.getBook)
    .delete(book.deleteBook)
    .put(book.updateBook);


module.exports = app; // for testing
