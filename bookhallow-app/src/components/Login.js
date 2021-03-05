import React, {useState} from "react";
import axios from "axios";

function Login(){
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");


  async function login(event){
        event.preventDefault();

     try{
       console.log("Form submitted");
       console.log("Username: " + username);
       console.log("Password: " + password);

       const loginData = {
         username,
         password,
       };

      await axios.post("http://localhost:5000/auth/login", loginData);
    }
    catch(err){ console.error(err); }
  }


  return(
    <div>
    <div className = "div1" >
      <div className = "ContainerCenter" >

      <h3 className="mainSubTitle">Login</h3>
            <a className="bodyTextLight nav-link" href="/register">Need to Register?</a>
      <form onSubmit={login}>
      <div className="form-group">
          <input type="text"
              className="form-control"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
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
          <input type="submit" value="Login" className="btn btn-light" />
        </div>

      </form>

      </div>
    </div>

    <div className = "divTownship" > < /div>

    </div>
  );
}


export default Login;
