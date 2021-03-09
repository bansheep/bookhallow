import React, {useContext, useState} from "react";
import '../index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../context/AuthContext";
import axios from "axios";


function Header(){
  const {loggedIn} = useContext(AuthContext);

  const[bookInfo, setBookInfo] =  useState("");

  async function search(event){
    event.preventDefault();

    try{
      console.log("Form submitted");
      console.log("Book info: " + bookInfo);

      const bookData = {
        titld: bookInfo
      };

     await axios.get("http://localhost:5000/auth/book:id", bookData)
                .then((response) => {
                  console.log(response.data);
                  console.log(response.status);
                  console.log(response.statusText);
                  console.log(response.headers);
                  console.log(response.config);
     });
   }
   catch(err){ console.error(err); }
  }


return <div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
  <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
    <div className="container-fluid">
      <a  className="navbar-brand" href="/">Bookhallow</a>

      <div className="search-container">
    <form action="/">
      <input type="text"
      placeholder="Search.."
      name="search"
      className="form-control"
      onChange={(e) => setBookInfo(e.target.value)}
      value={bookInfo}
      />
      <button type="submit" onSubmit={search} ><i className="fa fa-search"></i></button>
      </form>
    </div>

      <button className="navbar-toggler " type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarText" aria-controls="navbarText"
              aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        </ul>
        <span className="navbar-text">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          {loggedIn === false &&
            <>
            <li className="nav-item">
              <a className="nav-link" href={"/register"}>Register</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={"/login"}>Login</a>
            </li>
            </>
          }

          {loggedIn === true &&(
            <>
             <li className="nav-item">
              <a className="nav-link" href={"/account"}>Account</a>
            </li>
              <li className="nav-item">
                <a className="nav-link" href={"/logout"}>Logout</a>
              </li>
              </>)
            }

          </ul>

        </span>
      </div>
    </div>
  </nav>
</div>
}

export default Header;
