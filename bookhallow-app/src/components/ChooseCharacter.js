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
            <ChooseCharCard class="Warrior"/>
          </Col>
          <Col>
            <ChooseCharCard class="Healer"/>
          </Col>
          <Col>
            <ChooseCharCard class="Sorcerer"/>
          </Col>
        </Row>
        </div>


    </div>
  );
}

export default ChooseCharacter;
