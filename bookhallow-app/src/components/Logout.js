import React, {useContext, useEffect} from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function Logout(){
  const {getLoggedIn} =useContext(AuthContext);

  async function logOut(){
    await axios.get("http://localhost:5000/auth/logout");
    await getLoggedIn();
    console.log("logging out");
  }

  useEffect(()=>{
    logOut();
  });

  return (<div>
  <div className = "div1" >
    <div className = "ContainerCenter" >
    <h3 className="mainSubTitle">You have succesfully logged out</h3>
      </div>
  </div>

  <div className = "divTownship" > < /div>

  </div>)
};

export default Logout;
