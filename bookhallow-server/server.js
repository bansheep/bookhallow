const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require("cors");
let bodyParser = require('body-parser');
let book = require('./routers/bookRouter');
let search = require('./routers/searchRouter');


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
app.use("/booklist", require("./routers/bookListRouter"));
app.use("/mybooks", require("./routers/userBookRouter"));
app.use("/book", require("./routers/bookRouter"));
app.use("/search", require("./routers/searchRouter"));

module.exports = app; // for testing
