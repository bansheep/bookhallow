import React, {useContext} from "react";
import '../index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../context/AuthContext";


function Header(){
  const {loggedIn} = useContext(AuthContext);


return <div>
  <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
    <div className="container-fluid">
      <a  className="navbar-brand" href="/">Bookhallow</a>
      <button className="navbar-toggler " type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarText" aria-controls="navbarText"
              aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active " aria-current="page" href="/">Home</a>
          </li>

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
