import React from "react";
<<<<<<< HEAD

function Account(){
  return (<div>
    <div className = "div1" >
      <div className = "ContainerCenter" >
      <h3 className="mainSubTitle">Welcome to your account page!</h3>
        </div>
    </div>

    <div className = "divTownship" > < /div>
=======
import CharCard from "./CharCard";
import Jumbotron from 'react-bootstrap/Jumbotron'

function Account(){
  return (<div>
    <div className = "accountDiv" >
      <div className="row">
          <p></p>
      </div>

      <div className="row">
      <div className="col-sm">
        <CharCard />
        </div>
        <div className="col-6 col-sm">
        <Jumbotron>
          <h1 className="mainSubTitleLight">Welcome!</h1>
          <p>This is the main account page for each user.</p>
          <p>There will be a location for books in progress.</p>
          <p>Another section for challenges.</p>
          <p>Another for book lists.</p>
          <p>And there will be links for other parts!</p>
        </Jumbotron>

        </div>

        <div className="col">
        </div>

      </div >

    </div>
    <div className="divBookShelfLight" > < /div>
>>>>>>> 9a20fbf975ee98d16278bfab43d82b6703bf0bb9

    </div>)
};

export default Account;
