import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table'
import axios from "axios";
import harrowCover from '../images/9781250313225.jpg';

function BookListItem(){
  const [book, setBook] = useState([""]);
  //const [allBookLists, setAllBookLists] = useState([""]);
  const [bookList, setBookList] = useState([""]);

  async function getAllLists(){
    //get all book lists

    await axios.get("http://localhost:5000/booklist/")
              .then(res => {
                    const lists = res.data;
                    //setAllBookLists(lists);
                    console.log(lists[0]);
                    getFirstList(lists[0]);
                  });
  }

  async function getFirstList(listId){
    await axios.get("http://localhost:5000/booklist/" + listId)
              .then(res => {
                    const list = res.data;
                    console.log("id: " + list._id)
                    console.log("name: " + list.name);
                    console.log("books: " + list.books);
                    setBookList(list);
                    getBook(list.books[0]);
                  });
  }

async function getBook(bookId){
  await axios.get("http://localhost:5000/mybooks/" + bookId)
             .then(res => {
               const newBook = res.data;
               console.log("Book id: " + newBook.bookId );
               getBookFromDB(newBook.bookId);
             });
}

async function getBookFromDB(bookId){
  await axios.get("http://localhost:5000/book/" + bookId)
             .then(res => {
               const newBook = res.data;
               console.log("Title: " + newBook.title );
               console.log("Author Last: " + newBook.authorLast );
               console.log("isbn13: " + newBook.isbn13 );
               setBook(newBook);
             });
}

  useEffect(()=>{
    getAllLists();
  },[]);

  // <ul>
  //   <li key={bookList._id}> {bookList.name}</li>
  // </ul>
//      {allBookLists.map(list => ( <li key={list.id}> {list}</li> ))}
  return (
    <div>
    <h1 className="Headline">{bookList.name} Book List</h1>

    <Table responsive="sm"  hover>
    <thead>
         <tr>
           <th>#</th>
           <th>Cover</th>
           <th>Title</th>
           <th>Author</th>
           <th>Date Added</th>
           <th>Rating</th>
           <th>Challenge(s)</th>
         </tr>
       </thead>
      <tbody hover="true">
      <tr>
        <td>1</td>
        <td>
        <img alt="Harrow The Ninth" className = "bookcover_sm" src={harrowCover} />
        </td>
        <td><a className="nav-link" href={"/book"}>{book.title}</a></td>
        <td>{book.authorLast}</td>
        <td>01/01/01</td>
        <td>*****</td>
        <td>Locked Tomb</td>
      </tr>
      </tbody>
      </Table>
    </div>
  )
};

export default BookListItem;
