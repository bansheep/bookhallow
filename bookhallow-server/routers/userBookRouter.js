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
      if(err) console.error(err);

      else if(foundUser){
          // check list names
          if(foundUser.books.length === 0) console.log("No books yet!")

          else{
            for( var book = 0; book < foundUser.books.length; book++){
              Book.findById(foundUser.books[book], (err, foundBook) => {
                  if(err) console.error(err);
                  if(foundList)console.log(foundBook.title);
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
        if(err) console.error(err);

        else if(foundUser){
           console.log(foundUser.bookLists);

            // check list names
            BookList.findOne({userId:userId, name:customListName}, (err, foundList) => {
              if(err) console.error(err);

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

                // foundUser.bookLists.push(list._id);
                // foundUser.save();
                // console.log(foundUser.bookLists);
              }
              else{
                Book.findOne({title:bookName}, (err, book) => {
                  if(err) console.error(err);

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

// const userBookSchema = new Schema({
//     bookId: String,
//     rating: Number,
//     dateAdded: Date,
//     datesRead:{
//       type: [Date],
//       default: []
//     },
//     lists: {
//       type: [String],
//       default: []
//     },
//     challenges: {
//       type: [String],
//       default: []
//     },
// })

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
        if(err) console.error(err);

        else if(foundUser){
            // check list names
            UserBook.findById(id, (err, foundBook) => {
              if(err) console.error(err);

              if(!foundBook){
                  console.log("Book does not exist");
              }
              else{
                console.log(foundBook.title);
                res.json(foundBook);
              }
          });
        }
      });
    } catch(err){
      res.status(401).json({errorMessage: "Unauthorized"});
    }
});

    //     User.findOne({bookLists: customListName}, (err, foundList) =>{
    //       if(!err){
    //         if(!foundList){
    //           console.log("Book list does not exist!");
    //         }else{
    //           console.log("Book list already exists!");
    //         }
    //       }}
    //     })

    //     const list = new BookList(
    //       {name: customListName,
    //         description:"",
    //         books:[]
    //       });
    //
    //
    //     list.save();
    //   })
      //.delete();


// // Work on books read list
// router.route("/read")
//       .post()
//       .get()
//       .delete();
//
// // Work on books to read list
// router.route("/to-read")
//     .post()
//     .get()
//     .delete();


module.exports = router;
