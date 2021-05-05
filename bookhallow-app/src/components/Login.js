import React, {useContext, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login(){
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const {getLoggedIn} = useContext(AuthContext);

  const history = useHistory();

  async function login(event){
    event.preventDefault();

     try{
       const loginData = {
         username,
         password,
       };

      await axios.post("http://localhost:5000/auth/login", loginData);
      await getLoggedIn();
      await history.push("/account");
    }
    catch(err){ console.error(err); }
  }

  return(
    <div>
      <div className="div1">
        <div className = "ContainerCenter" >

        <h3 className="mainSubTitle">Login</h3>
        <a className="bodyTextLight nav-link" href="/register">Need to Register?</a>

        <Form onSubmit={login}>
          <Form.Group controlId="formUsername"
            onChange={(e) => setUsername(e.target.value)}
            value={username}>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>


          <Form.Group controlId="formPassword"
            onChange={(e) => setPassword(e.target.value)}
            value={password}>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>

          <Button variant="light" type="submit"> Login </Button>

          </Form>

      </div>
      </div>
      <div className = "divTownship" > < /div>
    </div>
  );
}

export default Login;
