import React from "react";
import Table from 'react-bootstrap/Table'

function AllBookLists(){

// TODO: Import axios and populate with user book lists

  return (
  <div className="bookListDiv">
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
