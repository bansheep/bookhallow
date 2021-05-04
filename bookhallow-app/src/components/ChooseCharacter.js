import React from "react";
import ChooseCharCard from './ChooseCharCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function ChooseCharacter(){
  return(
    <div>
        <div className = "accountDiv" >
        <h1> Choose your Bookhallow character</h1>
        <Row>
          <Col>
            <ChooseCharCard classType="Warrior"/>
          </Col>
          <Col>
            <ChooseCharCard classType="Healer"/>
          </Col>
          <Col>
            <ChooseCharCard classType="Sorcerer"/>
          </Col>
        </Row>

        </div>

    </div>
  );
}

export default ChooseCharacter;
