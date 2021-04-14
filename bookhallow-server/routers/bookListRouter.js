const router = require("express").Router();
const BookList = require("../models/UserBookList");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

//get all lists
router.get("/", auth, (req, res) => {
  try{
    
    const token = req.cookies.token;
    if (!token) return res.json(false);

    // compares token to JWT_SECRET, if no then throws error
    // the decoded payload of the JWT is put into verified
    // verified.user holds the user's id
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    let userId = verified.user;

    console.log("User = " + userId);
    User.findById(userId, (err, foundUser) => {
      if(err) res.send(err);

      else if(foundUser){
          // check list names
          if(foundUser.bookLists.length === 0) console.log("No book lists created yet!")

          else{
            const allLists = foundUser.bookLists;
            res.json(allLists);
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
        if(err) res.send(err);

        else if(foundUser){
           console.log(foundUser.bookLists);

            // check list names
            BookList.findOne({userId:userId, name:customListName}, (err, foundList) => {
              if(err) res.send(err);

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
        if(err) res.send(err);

        else if(foundUser){
            // check list names
            BookList.findById(customListName, (err, foundList) => {
              if(err) res.send(err);

              if(!foundList){
                  console.log("Book list does not exist");
              }
              else{
                res.json(foundList);
              }
          });
        }
      });
    } catch(err){
      res.status(401).json({errorMessage: "Unauthorized"});
    }
});

module.exports = router;
