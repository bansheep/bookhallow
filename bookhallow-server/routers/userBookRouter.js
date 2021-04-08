const router = require("express").Router();
const Book = require("../models/Book");
const UserBook = require("../models/UserBook");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

//get all books
router.get("/", auth, (req, reS) => {
  try{
    const token = req.cookies.token;
    if (!token) return res.json(false);

    // compares token to JWT_SECRET, if no then throws error
    // the decoded payload of the JWT is put into verified
    // verified.user holds the user's id
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    let userId = verified.user;

    User.findById(userId, (err, foundUser) => {
      if(err) next(err);

      else if(foundUser){
          // check list names
          if(foundUser.books.length === 0) console.log("No books yet!")

          else{
            for( var book = 0; book < foundUser.books.length; book++){
              Book.findById(foundUser.books[book], (err, foundBook) => {
                  if(err) next(err);
                  if(foundList) res.json(foundBook.title);
                });
              }
            }
        }
    });
  } catch(err){
    res.status(401).json({errorMessage: "Unauthorized"});
  }
});

// add book to custom lists
router.post("/:listName/:bookName", auth, async (req, res) => {
    const customListName = req.params.listName;
    const bookName = req.params.bookName;

    try{
      const token = req.cookies.token;
      if (!token) return res.json(false);

      // compares token to JWT_SECRET, if no then throws error
      // the decoded payload of the JWT is put into verified
      // verified.user holds the user's id
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      let userId = verified.user;

      User.findById(userId, (err, foundUser) => {
        if(err) next(err);

        else if(foundUser){
            // check list names
            BookList.findOne({userId:userId, name:customListName}, (err, foundList) => {
              if(err) next(err);

              if(!foundList){
                // create a new list
                const list = new BookList(
                  {
                    userId: userId,
                    name: customListName,
                    description:"",
                    books:[]
                  });

                list.save();
              }
              else{
                Book.findOne({title:bookName}, (err, book) => {
                  if(err) next(err);

                  if(!book) console.log("Book is not in the database")

                  else{
                    const newUserBook = new UserBook(
                    {
                      bookId: book._id,
                      userId: foundUser._id
                    });

                    foundUser.books.push(newUserBook._id);
                    foundUser.save();

                    newUserBook.lists.push(foundList._id);
                    newUserBook.save();


                    foundList.books.push(newUserBook._id);
                    foundList.save();
                  }
                });

              }
          });
        }
      });
    } catch(err){
      res.status(401).json({errorMessage: "Unauthorized"});
    }

});


// get one book from books[]
router.get("/:id", auth, async (req, res) => {
    const id = req.params.id;

    try{
      const token = req.cookies.token;
      if (!token) return res.json(false);

      // compares token to JWT_SECRET, if no then throws error
      // the decoded payload of the JWT is put into verified
      // verified.user holds the user's id
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      let userId = verified.user;

      User.findById(userId, (err, foundUser) => {
        if(err) next(err);

        else if(foundUser){
            // check list names
            UserBook.findById(id, (err, foundBook) => {
              if(err) next(err);

              if(!foundBook){
                  console.log("UserBook " + id +  " does not exist");
              }
              else{
                res.json(foundBook);
              }
          });
        }
      });
    } catch(err){
      res.status(401).json({errorMessage: "Unauthorized"});
    }
});

module.exports = router;
