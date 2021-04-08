import React, {createContext, useState, useEffect} from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props){
  const[loggedIn, setLoggedIn] = useState(false);

  async function getLoggedIn(){
    const loggedInResponse = await axios.get("http://localhost:5000/auth/loggedIn/")
    await setLoggedIn(loggedInResponse.data);
  }

  useEffect(()=>{
    getLoggedIn();
  });

  return (
    <AuthContext.Provider value={{loggedIn, getLoggedIn}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export {AuthContextProvider};
