const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register!
router.post("/", async (req,res) => {
  try{
    const {username, email, password, passwordVerify} = req.body;

//validation
    if(!username || !email || !password || !passwordVerify)
      return res.status(400).json({errorMessage: "Please enter all required fields"});

    if(password.length < 8)
      return res.status(400).json({errorMessage: "Please enter a password of 8 or more characters"});

    if(password !== passwordVerify)
      return res.status(400).json({errorMessage: "Passwords do not match"});


    const existingUser = await User.findOne({ username });

    if(existingUser)
      return res.status(400).json({errorMessage: "Username already exists."});

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save new user account

    const newUser = new User({username:username, email:email, password:passwordHash});
    const savedUser = newUser.save()
              .then()
              .catch(err => {
               res.status(500).json({
                  errors: [{ error: err }]
                })
               });

    // log user in
    // sign the token
    const token = jwt.sign({user: savedUser._id}, process.env.JWT_SECRET);

    // send the token in a HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true
    }).send();
  }
  catch(err){
    res.status(500).send();
    res.send(err);
  }
});


// Login
router.post("/login", async (req, res) => {
  try{
    const {username, password} = req.body;

    if(!username || !password)
      return res.status(400).json({errorMessage: "Please enter all required fields"});

    const existingUser = await User.findOne({username});
    if(!existingUser)
      return res.status(401).json({errorMessage: "Incorrect username and/or password "})

    const passwordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!passwordCorrect)
      return res.status(401).json({errorMessage: "Incorrect username and/or password "})

    // sign the token
    const token = jwt.sign({user: existingUser._id}, process.env.JWT_SECRET);

    // send the token in a HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true
    }).send();

  }
  catch(err){
    res.status(500).send();
    res.send(err);
  }

});

// Log out
router.get("/logout", (req,res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  })
  .send();
});

router.get("/loggedIn", (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token)
        return res.json(false);
      jwt.verify(token, process.env.JWT_SECRET);
      res.send(true);
    } catch (err) {
      res.json(false);
      res.send(err);
    }
  }
);

router.get("/:id", (req,res) => {
  User.findById(req.params.id, (err, user) => {
      if(err)res.send(err);
      else res.json(user);
  });

});

router.get("/", (req,res) => {
  let query = User.find({});
  query.exec((err, users) => {
      if(err) res.send(err);
      else res.json(users);
  });
});


router.post("/choose_character", async (req, res) => {
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
          foundUser.character = req.body;
          foundUser.save()
          .then(console.log(foundUser.character))
          .catch(err => {
           res.status(500).json({
              errors: [{ error: err }]
            })
          });

        }
    });
  } catch(err){
    res.status(401).json({errorMessage: "Unauthorized"});
  }

});

router.get("/character",  async (req, res) => {
  console.log("router get character?");
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
          console.log(foundUser);
          res.json(foundUser);
          res.send(foundUser.character);
      }
    });
  } catch(err){
    res.status(401).json({errorMessage: "Unauthorized"});
  }
});

module.exports = router;
