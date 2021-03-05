const router = require("express").Router();
const  User = require("../models/User");
const bcrypt = require("bcryptjs");

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

    const savedUser = await newUser.save();

    console.log(existingUser);

  }
  catch(err){
    console.error(err);
    res.status(500).send();
  }
});


module.exports = router;
