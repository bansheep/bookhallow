import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Register from "./components/Register";
import Login from "./components/Login";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Body}/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
    </Router>
  );
}

export default App;
