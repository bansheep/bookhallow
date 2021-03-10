const router = require("express").Router();
const BookList = require("../models/UserBookList");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");



//get all lists
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
          if(foundUser.bookLists.length === 0) console.log("No book lists created yet!")

          else{
            for( var list = 0; list < foundUser.bookLists.length; list++){
              BookList.findById(foundUser.bookLists[list], (err, foundList) => {
                  if(err) console.error(err);
                  if(foundList)console.log(foundList.name + ": " + foundList._id);
                });
              }
            }
        }
    });
  } catch(err){
    res.status(401).json({errorMessage: "Unauthorized"});
  }
});

// create custom lists
router.post("/:listName", auth, async (req, res) => {
    const customListName = req.params.listName;

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

                foundUser.bookLists.push(list._id);
                foundUser.save();
                console.log(foundUser.bookLists);
              }
              else{
                console.log("List " + customListName + " already exists!");
              }
          });
        }
      });
    } catch(err){
      res.status(401).json({errorMessage: "Unauthorized"});
    }

});



// get one custom list
router.get("/:listName", auth, async (req, res) => {
    const customListName = req.params.listName;

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
            BookList.findOne({userId:userId, name:customListName}, (err, foundList) => {
              if(err) console.error(err);

              if(!foundList){
                  console.log("Book list does not exist");
              }
              else{
                console.log(foundList.name + ": " + foundList._id);
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
