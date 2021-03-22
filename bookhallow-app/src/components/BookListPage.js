import React from "react";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import BookListItem from './BookListItem'
import BookLists from './BookList'


//import axios from "axios";

function BookListPage(){

  return (
  <div>
  <Container fluid>
    <Row>
      <Col><BookLists/></Col>
      <Col xs={10}><BookListItem/></Col>
    </Row>
  </Container>
  </div>)
};

export default BookListPage;
