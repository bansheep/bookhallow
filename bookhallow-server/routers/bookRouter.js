const router = require("express").Router();
const Book = require("../models/Book");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try{
    // Since auth has succeeded, the user id is available to use
    const {title} = req.body;

    const newBook = new Book({
      title: title
    });

    const savedBook =  newBook.save()
                  .then()
                  .catch(err => {
                   res.status(500).json({
                      errors: [{ error: err }]
                    })
                   });

    res.json(savedBook);

  }
  catch(err){
    console.error(err);
    res.status(500).send();
  }
});


router.get("/", auth, async (req, res)=>{
  try{
    const books = await Book.find();
    res.json(books);
  }
  catch(err){
    console.error(err);
    res.status(500).send();
  }
});


module.exports = router;
