import React from "react";
import CharCard from "./CharCard";
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from "axios";

function Account(){

axios.get("http://localhost:5000/book/60445351945c2735c61cabb6")
      .then(res => res.data)
      .catch(err => console.error(err));

  return (
  <div>
    <div className = "accountDiv" >
      <div className="row">

        <div className="col-sm">
          <CharCard />
        </div>

        <div className="col-6 col-sm">
          <Jumbotron>
            <h1 className="mainSubTitleLight">Welcome!</h1>
            <p>This is your account page.</p>
          </Jumbotron>
        </div>

      </div >
    </div>
  </div>)
};

export default Account;
