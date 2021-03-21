import React from "react";
import axios from "axios";

function BookList(){

axios.get("http://localhost:5000/book/60445351945c2735c61cabb6")
              .then(res => res.data)
              .catch(err => console.error(err));

  return (<div>
    <h1> Book List Page</h1>

    </div>)
};

export default BookList;
