import React, {useContext, useState} from "react";
import '../index.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import AuthContext from "../context/AuthContext";
import Button from 'react-bootstrap/Button';
import axios from "axios";


function Header(){
  const {loggedIn} = useContext(AuthContext);
  const[bookInfo, setBookInfo] =  useState("");

  function search(event){
    event.preventDefault();
    try{
      console.log("Form submitted");
      console.log("Book =-: " + bookInfo);


     axios.get("http://localhost:5000/search/"+ bookInfo)
                .then((response) => {
                  console.log(response.data);
                })
                .catch(err => console.error(err));

     setBookInfo("");
   }
   catch(err){ console.error(err); }
  }

  return(
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Bookhallow</Navbar.Brand>
        <Nav className="mr-auto">
          {loggedIn === false &&
              <>
              <Nav.Link href={"/register"}>Register</Nav.Link>
              <Nav.Link href={"/login"}>Login</Nav.Link>
              </>
          }

          {loggedIn === true &&
            <>
            <Nav.Link href={"/book_list_page"}>Book Lists</Nav.Link>
            <Nav.Link href={"/account"}>Account</Nav.Link>
            <Nav.Link href={"/logout"}>Logout</Nav.Link>
            </>
            }
        </Nav>

        <Form inline onSubmit={search}  onChange={(e) => setBookInfo(e.target.value)}>
          <FormControl type="text" placeholder="Book Title" className="mr-sm-2" />
          <Button variant="outline-info" type="submit" >Search</Button>
        </Form>
      </Navbar>
    </div>
  );
}


export default Header;
