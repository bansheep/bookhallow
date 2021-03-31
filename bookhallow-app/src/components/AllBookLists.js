import React from "react";
import Table from 'react-bootstrap/Table'

//import axios from "axios";

function AllBookLists(){

  return (
  <div>
  <h1 className="Headline">Book Lists</h1>
  <Table hover>
    <tbody>
      <tr>
        <td><a className="nav-link" href={"/book_list_page"}>read</a></td>
      </tr>
      <tr>
        <td><a className="nav-link" href={"/book_list_page"}>to-read</a></td>
      </tr>
    </tbody>
  </Table>
  </div>)
};

export default AllBookLists;
