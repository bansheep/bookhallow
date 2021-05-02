import React, {useContext}  from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Account from "./components/Account";
import BookListPage from "./components/BookListPage";
import Book from "./components/Book";
import ChallengeForm from "./components/ChallengeForm";
import ChooseCharacter from "./components/ChooseCharacter";
import AuthContext, {AuthContextProvider} from "./context/AuthContext";

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
            <Route path="/book_list_page" component={Login}/>
            <Route path="/account" component={Login}/>
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
            <Route path="/challenge_form" component={ChallengeForm}/>
            <Route path="/choose_character" component={ChooseCharacter}/>
            </>
          )
        }
        <Route path='/book' component={Book}/>

      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default Router;
