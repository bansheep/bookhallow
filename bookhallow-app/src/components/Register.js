import React, {useContext, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      const loggedIn = await getLoggedIn();
      if(!loggedIn){
        const loginData = {
          username,
          password,
        };
        await axios.post("http://localhost:5000/auth/login", loginData);}


    }    catch(err){ console.error(err); }

    await history.push("/choose_character");

  }

  return(
    <div>
      <div className="div1">

        <div className = "ContainerCenter" >

        <h3 className="mainSubTitle">Start your journey</h3>
        <a className="bodyTextLight nav-link" href="/login">Already Registered?</a>

        <Form onSubmit={register}>
          <Form.Group controlId="formUsername"
            onChange={(e) => setUsername(e.target.value)}
            value={username}>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group controlId="formEmail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formPassword"
            onChange={(e) => setPassword(e.target.value)}
            value={password}>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>

          <Form.Group controlId="formPasswordVerify"
            onChange={(e) => setPasswordVerify(e.target.value)}
            value={passwordVerify}>
            <Form.Control type="password" placeholder="Re-enter password" />
          </Form.Group>

          <Button variant="light" type="submit"> Register </Button>

        </Form>

       </div>
       </div>
      <div className = "divTownship" > < /div>
    </div>
  );
}

export default Register;
