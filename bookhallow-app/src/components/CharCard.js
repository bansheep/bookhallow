import React from "react";
import '../index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Healer from "../images/Healer.png";
import Sorcerer from "../images/Sorcerer.png";
import Warrior from "../images/Warrior.png";
import Default from "../images/Character.png"


function CharCard(props){
  return(
    <div>
      <Card style={{ width: '15rem' }}>
        <Card.Img variant="top"
                  src={props.classType === "Warrior" ? Warrior :
                                    (props.classType === "Healer" ? Healer :
                                    (props.classType === "Sorcerer"? Sorcerer : Default))}
                  alt="Character" />
        <Card.Body>
          <Card.Title>Class: {props.classType}</Card.Title>
          <ProgressBar now={60} />
          <Card.Text>
            Information about the character would be here.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CharCard;
