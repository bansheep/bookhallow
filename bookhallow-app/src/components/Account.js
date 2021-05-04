import React, {useState, useEffect} from "react";
import CharCard from "./CharCard";
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from "axios";

function Account(){
  const[character, setCharacter] = useState( {
    classType: "",
    level: 0,
    experience: 0,
    health: 0,
    skills: []
  });


  async function getCharacterInfo(){
    await axios.get("http://localhost:5000/auth/character")
               .then(res => {
                 console.log("getCharacterInfo()");
                 console.log(res.data);
                 setCharacter(res.data);
               });
  }

  useEffect(()=>{
    getCharacterInfo();
  },[]);

  return (
  <div>
    <div className = "accountDiv" >
      <div className="row">

        <div className="col-sm">
          <CharCard classType={character.classType}/>
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
