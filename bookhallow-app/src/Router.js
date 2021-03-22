import React, {useContext}  from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout"
import Account from "./components/Account"
import BookListPage from "./components/BookListPage"
import Book from "./components/Book"
import AuthContext, {AuthContextProvider} from "./context/AuthContext"

function Router() {
  const {loggedIn} = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={Body}/>

        {
          loggedIn === false &&
          (<>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            </>
          )
        }

        {
          loggedIn === true &&
          (
            <>
            <Route path="/book_list_page" component={BookListPage}/>
            <Route path="/account" component={Account}/>
            <Route path="/logout" component={Logout}/>
            </>
          )
        }
        <Route path='/book' component={Book}/>

      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default Router;
