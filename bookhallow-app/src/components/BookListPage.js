import React from "react";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import ShowBookList from './ShowBookList'
import AllBookLists from './AllBookLists'


//import axios from "axios";

function BookListPage(){

  return (
  <div>
  <Container fluid>
    <Row>
      <Col><AllBookLists/></Col>
      <Col xs={10}><ShowBookList/></Col>
    </Row>
  </Container>
  </div>)
};

export default BookListPage;
