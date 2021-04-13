import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table'
import axios from "axios";
import harrowCover from '../images/9781250313225.jpg';

function ShowBookList(){
  const [userBook, setUserBook] = useState([]);
  const [bookList, setBookList] = useState([""]);


  async function getAllLists(){
    //get all book lists
    await axios.get("http://localhost:5000/booklist")
               .then(res => {
                    const lists = res.data;
                    getFirstList(lists[0]);
               });
  }

  async function getFirstList(listId){
    await axios.get("http://localhost:5000/booklist/" + listId)
               .then(res => {
                    const list = res.data;
                    setBookList(list);

                    for(var i = 0; i < list.books.length; i++)
                    {
                      getBook(list.books[i]);
                    }
               });
  }

async function getBook(bookId){
  await axios.get("http://localhost:5000/mybooks/" + bookId)
             .then(res => {
               const myBook = res.data;
               axios.get("http://localhost:5000/book/" + myBook.bookId)
                    .then(res2 => {
                            const dbBook = res2.data;
                            let newBook = {
                              title: dbBook.title,
                              authorLast: dbBook.authorLast,
                              authorFirst: dbBook.authorFirst,
                              status:  myBook.status,
                              dateAdded: myBook.dateAdded
                            }
                            setUserBook(prevItems => [...prevItems, newBook]);
                    });
             });
}

  useEffect(()=>{
    getAllLists();
  },[]);

  return (
    <div className="bookListDiv">
    <h1 className="Headline">{bookList.name} Book List</h1>

    <Table responsive="sm"  hover>
    <thead>
         <tr>
           <th>Cover</th>
           <th>Title</th>
           <th>Author</th>
           <th>Date Added</th>
           <th>Status</th>
           <th>Challenge(s)</th>
         </tr>
       </thead>

      <tbody hover="true">
      {userBook.map(book =>
        <tr key={book._id}>
          <td key={book._id}><img alt="Harrow The Ninth" className = "bookcover_sm" src={harrowCover} /></td>
          <td key={book._id}><a className="nav-link" href={"/book"}>{book.title}</a></td>
          <td key={book._id}>{book.authorLast}, {book.authorFirst}</td>
          <td key={book._id}>{book.dateAdded}</td>
          <td key={book._id}>{book.status}</td>
          <td key={book._id}>{book.challenges}</td>
        </tr>
      )}
      </tbody>
      </Table>
    </div>
  )
};


export default ShowBookList;
