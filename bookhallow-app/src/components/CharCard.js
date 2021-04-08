import React from "react";
import '../index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import character from "../images/Character.png";

function CharCard(){
  return(
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={character} alt="Character" />
        <Card.Body>
          <Card.Title>Character Information</Card.Title>
          <ProgressBar now={60} />
          <Card.Text>
            Character information here
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CharCard;
