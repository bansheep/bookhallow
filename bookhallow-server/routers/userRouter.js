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
    console.error(err);
    res.status(500).send();
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
    console.error(err);
    res.status(500).send();
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

module.exports = router;
