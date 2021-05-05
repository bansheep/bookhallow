import React from "react";
import '../index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useHistory} from "react-router-dom";
import axios from "axios";
import Healer from "../images/Healer.png";
import Sorcerer from "../images/Sorcerer.png";
import Warrior from "../images/Warrior.png";


function CharCard(props){

  const history = useHistory();

  async function charSelect(event){
    event.preventDefault();

    const newCharacter = props.classType;

    // Need to look into await for the axios.post command
    await axios.post("http://localhost:5000/auth/choose_character", {character: newCharacter});
    await history.push("/account");

  }

  return(
    <div>
      <Card style={{ width: '17rem' }}>
        <Card.Img variant="top" src={props.classType === "Warrior" ? Warrior: (props.classType === "Healer" ? Healer: Sorcerer)} alt="Character" />
        <Card.Body>
          <Card.Title>{props.classType}</Card.Title>
          <Card.Text>
          Artist: https://timecowboy.tumblr.com
          </Card.Text>
          <Form onSubmit={charSelect}>
            <Button variant="dark" type="submit"> Choose me! </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CharCard;
