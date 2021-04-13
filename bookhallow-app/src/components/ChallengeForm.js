import React, {useContext, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CreateChallenge(){
  //const[challenge, setSetChallenge] = useState("");
  const[challengeName, setChallengeName] = useState("");
  const[challengeDesc, setDesc] = useState("");
  const[challengeEndDate, setDate] = useState([""]);
  //const[challengeBooks, setBooks] = useState([""]);

  const {getLoggedIn} = useContext(AuthContext);

  const history = useHistory();

  async function newChallenge(event){
    event.preventDefault();

     try{
       const newChallenge = {

       };

      await axios.post("http://localhost:5000/auth/", newChallenge._id);
      await getLoggedIn();
      await history.push("/account");
    }
    catch(err){ console.error(err); }
  }

  return(
    <div>
        <div className="challengeFormDiv">
        <h3 className="mainSubTitle">Create Your New Challenge</h3>


        <Form onSubmit={newChallenge}>
          <Form.Group as={Row} controlId="formName" onChange={(e) => setChallengeName(e.target.value)} value={challengeName}>
          <Form.Label column sm="2">
            Challenge Name
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Enter Name of Challenge" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}  controlId="formDesc"
            onChange={(e) => setDesc(e.target.value)}
            value={challengeDesc}>
            <Form.Label column sm="2">
              Description
            </Form.Label>
            <Col sm="10">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}  controlId="formDate"
            onChange={(e) => setDate(e.target.value)}
            value={challengeEndDate}>
            <Form.Label column sm="2">
              Challenge End Date
            </Form.Label>
            <Col sm="10">
            <Form.Control type="date"/>
            </Col>
          </Form.Group>

          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Type of Challenge
              </Form.Label>
              
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Number of Books"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="Bingo"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="Series"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
          </fieldset>


          <div className="challengeContainer">

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Private Challenge" />
          </Form.Group>

          <Button variant="dark" type="submit"> Create New Challenge </Button>
          </div>

        </Form>
        </div>

    </div>
  );
}

export default CreateChallenge;
