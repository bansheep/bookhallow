const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require("cors");
let bodyParser = require('body-parser');
let book = require('./routers/bookRouter')
let config = require('config'); //we load the db location from the JSON files
require('dotenv').config();



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

app.route("/book")
    .get(book.getBooks)
    .post(book.postBook);
app.route("/book/:id")
    .get(book.getBook)
    .delete(book.deleteBook)
    .put(book.updateBook);

// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
//
//
// const userRoutes = express.Router();
//
// let User = require('./models/User');
//
// //import routes
// const authRoutes = require('./routes/auth');
//

//

//
// //middewares
// app.use(bodyParser.json());
//
// app.use(cors());
//
// //routes middleware////
// app.use('/', authRoutes);
//
// app.route("/books") // Get route that fetches all bookSchema
//   .get(function(req, res) {
//     Book.find(function(err, foundBooks) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send(foundBooks);
//       }
//     });
// });
//
// app.route("/addAccount")
// .post(function(req,res){
//   let user = new User(req.body);
//
//   user.save()
//       .then(user => {
//         res.status(200).json({'user': 'user added successfully'})
//       })
//       .catch(err=> {
//         res.status(400).send('adding new user failed');
//       });
// });
//
// app.route('/').get(function(req, res){
//     User.find(function(err, users){
//         if(err){
//             console.log(err);
//         }else{
//             res.json(users);
//         }
//     });
// });


module.exports = app; // for testing
