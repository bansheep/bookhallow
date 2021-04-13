import React, {useContext, useState} from "react";
import '../index.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import AuthContext from "../context/AuthContext";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
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
      <Navbar bg="dark" variant="dark" className="justify-content-between" fixed="top">
        <Navbar.Brand href="#home">Bookhallow</Navbar.Brand>


        <Form inline onSubmit={search}  onChange={(e) => setBookInfo(e.target.value)}>
          <FormControl type="text" placeholder="Book Title" className="mr-sm-2" />
          <Button variant="outline-warning" type="submit" >Search</Button>
        </Form>

        <Nav className="mr-sm-2 ">
          {loggedIn === false &&
              <>
              <Nav.Link href={"/register"}>Register</Nav.Link>
              <Nav.Link href={"/login"}>Login</Nav.Link>
              </>
          }

          {loggedIn === true &&
            <>
            <DropdownButton
            id="dropdown-basic-button"
            title="Account"
            variant="outline-warning">
              <Dropdown.Item href={"/account"}>Account</Dropdown.Item>
              <Dropdown.Item href={"/book_list_page"}>Book Lists</Dropdown.Item>
              <Dropdown.Item href={"/challenge_form"}>Create Challenge</Dropdown.Item>
              <Dropdown.Item href={"/logout"}>Logout</Dropdown.Item>
            </DropdownButton>
            </>
            }
        </Nav>
      </Navbar>
    </div>
  );
}


export default Header;
