import React, {useContext, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Register(){
  const[username, setUsername] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[passwordVerify, setPasswordVerify] = useState("");
  const {getLoggedIn} = useContext(AuthContext);

  const history = useHistory();

  async function register(event){
        event.preventDefault();

     try{
       const newAccount = {
         username,
         email,
         password,
         passwordVerify
       };

      await axios.post("http://localhost:5000/auth/", newAccount);
      getLoggedIn();
      history.push("/account");
    }
    catch(err){ console.error(err); }
  }

  return(
    <div>
    <div className = "div1" >
      <div className = "ContainerCenter" >
      <h3 className="mainSubTitle">Start your journey</h3>
      <a className="bodyTextLight nav-link" href="/login">Already Registered?</a>

      <form onSubmit={register}>
        <div className="form-group">
            <input type="text"
                className="form-control"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
        </div>

        <div className="form-group">
            <input type="email"
                className="form-control"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
        </div>

        <div className="form-group">
            <input type="password"
                className="form-control"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
        </div>

        <div className="form-group">
            <input type="password"
                className="form-control"
                placeholder="repeat password"
                onChange={(e) => setPasswordVerify(e.target.value)}
                value={passwordVerify}
            />
        </div>

        <div className="form-group">
          <input type="submit" value="Register" className="btn btn-light" />
        </div>

      </form>

      </div>
    </div>

    <div className = "divTownship" > < /div>

    </div>
  );
}


export default Register;
