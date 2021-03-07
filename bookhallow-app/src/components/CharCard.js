import React from "react";
import '../index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import character from "../images/Character.png";
//import AuthContext from "../context/AuthContext";


// cat image: http://clipart-library.com/clipart/6ir6r5EXT.htm


function CharCard(){
  return(
    <div className="card" style={{"width": "18rem"}}>
      <img className="card-img-top description-icons" src={character} alt="Character" />
      <div className="card-body">
        <h5 className="card-title">Character Information</h5>

        <div className="progress">
          <div className="progress-bar bg-info" role="progressbar" style={{"width": "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p className="card-text">XP: 500/1000</p>
        <p className="card-text">Level: 100</p>
        <p className="card-text">HP: 100/150</p>


      </div>
    </div>
  );
}

export default CharCard;
