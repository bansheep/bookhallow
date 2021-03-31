import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import harrowCover from '../images/9781250313225.jpg';

//import axios from "axios";

function Book(){

  return (
  <div>
  <container className="ContainerCenter">
    <h1>Harrow the Ninth</h1>
    <p>Locked Tomb Series #2</p>
    <img alt="Harrow The Ninth" className = "bookcover_lg" src ={harrowCover} / >
    <p></p>

    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle id="dropdown-custom-1">Add To Book List</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="1">2021</Dropdown.Item>
        <Dropdown.Item eventKey="2">Favorites</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Space</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>{' '}
    <Dropdown as={ButtonGroup}>
    <Dropdown.Toggle id="dropdown-custom-1">Add To Challenge</Dropdown.Toggle>
    <Dropdown.Menu >
      <Dropdown.Item eventKey="1">2021 Books</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="4">Locked Tomb</Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>

</container>
  </div>)
};

export default Book;
