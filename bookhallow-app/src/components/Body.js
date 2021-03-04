import React from "react";
import '../index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import sword from '../images/Track.png';
import heart from '../images/Earn.png';
import trophy from '../images/LevelUp.png';


function Body() {
return (
  <div >
    <div className = "div1" >
      <div className = "ContainerCenter" >
        <span className = "mainTitle" > Bookhallow < /span>
        <span className = "mainSubTitle" > Gamify Your Reading < /span>
      </div>
    </div>

    <div className = "divTownship" > < /div>

    <div className="container">
    <div className = "row" >
      <div className = "col-md" >
        <div className="row">
          <img alt="Sword" className = "description-icons" src ={sword} / >
        </div>
        <p className = "Headline" > TRACK < /p>
        <p className = "BodyText" > Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. < /p>

      </div>
      <div className = "col-md" >
        <div className="row">
            <img alt ="Heart" className = "description-icons" src = {heart} / >
        </div>
        <p className = "Headline" > EARN < /p>
        <p className = "BodyText" > Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. < /p>
      </div>
      <div className = "col-md" >
        <div className="row">
          <img alt="Trophy" className = "description-icons" src = {trophy} / >
        </div>
        <p className = "Headline" > LEVEL UP < /p>
        <p className = "BodyText" > Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. < /p>
      </div>
    </div>
    </div>
    <div className = "div3Break" > < /div>
    <div className = "divBookShelf" > < /div>
    <div className = "Footer" > < /div>
  </div>
  )
}

export default Body;
